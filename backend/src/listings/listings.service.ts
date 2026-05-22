import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma, PropertyStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

const MAX_RECOMMENDED_FETCH = 500;

const VALID_STATUSES: PropertyStatus[] = [
  PropertyStatus.DISPONIVEL,
  PropertyStatus.VENDIDO,
];

@Injectable()
export class ListingsService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  /**
   * Lista todos os imóveis com filtros opcionais
   */
  async findAll(params: {
    page?: number;
    limit?: number;
    min_price?: number;
    max_price?: number;
    city?: string;
    neighborhood?: string;
    status?: PropertyStatus[];
  }) {
    const { page = 1, limit = 10 } =
      params;

    const skip = (page - 1) * limit;

    const statuses =
      params.status?.length
        ? params.status.filter((s) =>
          VALID_STATUSES.includes(s),
        )
        : [PropertyStatus.DISPONIVEL];

    const addressWhere: Prisma.AddressWhereInput =
      {};

    if (params.city) {
      addressWhere.city = {
        contains: params.city,
        mode: 'insensitive',
      };
    }

    if (params.neighborhood) {
      addressWhere.neighborhood = {
        contains: params.neighborhood,
        mode: 'insensitive',
      };
    }

    const priceFilter:
      | Prisma.DecimalFilter
      | undefined = (() => {
        const conditions: {
          gte?: number;
          lte?: number;
        } = {};

        if (
          params.min_price != null &&
          params.min_price >= 0
        ) {
          conditions.gte =
            params.min_price;
        }

        if (
          params.max_price != null &&
          params.max_price >= 0
        ) {
          conditions.lte =
            params.max_price;
        }

        return Object.keys(conditions)
          .length
          ? (conditions as Prisma.DecimalFilter)
          : undefined;
      })();

    const baseWhere: Prisma.PropertyWhereInput =
    {
      status: { in: statuses },

      ...(Object.keys(addressWhere)
        .length && {
        address: addressWhere,
      }),

      ...(priceFilter && {
        price: priceFilter,
      }),
    };

    const include = {
      address: true,

      images: {
        orderBy: {
          sort_order: 'asc' as const,
        },
      },

      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          creci: true,
          phone: true,
          whatsapp: true,
        },
      },
    };

    const [data, total] =
      await Promise.all([
        this.prisma.property.findMany({
          where: baseWhere,
          skip,
          take: limit,
          orderBy: {
            updated_at: 'desc',
          },
          include,
        }),

        this.prisma.property.count({
          where: baseWhere,
        }),
      ]);

    return {
      data: data.map((p) =>
        this.mapProperty(p),
      ),

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit,
        ),
      },
    };
  }

  /**
   * Lista imóveis públicos de um corretor
   */
  async findByOwner(params: {
    ownerId: string;
    page?: number;
    limit?: number;
    status?: PropertyStatus[];
  }) {
    const {
      ownerId,
      page = 1,
      limit = 10,
    } = params;

    const skip = (page - 1) * limit;

    const statuses =
      params.status?.length
        ? params.status.filter((s) =>
          VALID_STATUSES.includes(s),
        )
        : VALID_STATUSES;

    const include = {
      address: true,

      images: {
        orderBy: {
          sort_order: 'asc' as const,
        },
      },

      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          creci: true,
          phone: true,
          whatsapp: true,
        },
      },
    };

    const baseWhere: Prisma.PropertyWhereInput =
    {
      owner_id: ownerId,

      status: {
        in: statuses,
      },
    };

    const [data, total] =
      await Promise.all([
        this.prisma.property.findMany({
          where: baseWhere,
          skip,
          take: limit,
          orderBy: {
            updated_at: 'desc',
          },
          include,
        }),

        this.prisma.property.count({
          where: baseWhere,
        }),
      ]);

    return {
      data: data.map((p) =>
        this.mapProperty(p),
      ),

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit,
        ),
      },
    };
  }

  /**
   * Recomendações personalizadas
   */
  async findRecommendations(
    userId: string,
    page = 1,
    limit = 10,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: { id: userId },
        include: { address: true },
      });

    if (!user?.address) {
      throw new BadRequestException(
        'Para ver recomendações, cadastre um endereço no seu perfil.',
      );
    }

    const renda =
      user.renda_mensal != null
        ? Number(user.renda_mensal)
        : 0;

    const entrada =
      user.valor_entrada != null
        ? Number(user.valor_entrada)
        : 0;

    const hasFinancial =
      renda > 0 || entrada > 0;

    const hasState =
      !!user.address.state;

    const hasCity =
      !!user.address.city;

    if (
      !hasState &&
      !hasCity &&
      !hasFinancial
    ) {
      throw new BadRequestException(
        'Para ver recomendações, cadastre endereço e/ou renda.',
      );
    }

    const baseWhere: Prisma.PropertyWhereInput =
    {
      status:
        PropertyStatus.DISPONIVEL,
    };

    if (hasFinancial) {
      const byEntrada =
        entrada > 0
          ? entrada / 0.2
          : Infinity;

      const byRenda =
        renda > 0
          ? entrada + renda * 120
          : Infinity;

      const maxPrice = Math.min(
        byEntrada,
        byRenda,
      );

      if (
        Number.isFinite(maxPrice) &&
        maxPrice > 0
      ) {
        baseWhere.price = {
          lte: maxPrice,
        };
      }
    }

    const include = {
      address: true,

      images: {
        orderBy: {
          sort_order: 'asc' as const,
        },
      },

      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          creci: true,
          phone: true,
          whatsapp: true,
        },
      },
    };

    const userState =
      user.address.state
        ?.toLowerCase()
        .trim() ?? '';

    const userCity =
      user.address.city
        ?.toLowerCase()
        .trim() ?? '';

    const [allData, total] =
      await Promise.all([
        this.prisma.property.findMany({
          where: baseWhere,
          take:
            MAX_RECOMMENDED_FETCH,
          orderBy: {
            updated_at: 'desc',
          },
          include,
        }),

        this.prisma.property.count({
          where: baseWhere,
        }),
      ]);

    const sorted = [...allData].sort(
      (a, b) => {
        const aState =
          (a.address as {
            state?: string;
          } | null)
            ?.state
            ?.toLowerCase()
            .trim() ?? '';

        const bState =
          (b.address as {
            state?: string;
          } | null)
            ?.state
            ?.toLowerCase()
            .trim() ?? '';

        const aStateMatch =
          userState &&
            aState === userState
            ? 1
            : 0;

        const bStateMatch =
          userState &&
            bState === userState
            ? 1
            : 0;

        if (
          bStateMatch !== aStateMatch
        ) {
          return (
            bStateMatch - aStateMatch
          );
        }

        const aCity =
          (a.address as {
            city?: string;
          } | null)
            ?.city
            ?.toLowerCase()
            .trim() ?? '';

        const bCity =
          (b.address as {
            city?: string;
          } | null)
            ?.city
            ?.toLowerCase()
            .trim() ?? '';

        const aCityMatch =
          userCity &&
            aCity === userCity
            ? 1
            : 0;

        const bCityMatch =
          userCity &&
            bCity === userCity
            ? 1
            : 0;

        if (
          bCityMatch !== aCityMatch
        ) {
          return (
            bCityMatch - aCityMatch
          );
        }

        return 0;
      },
    );

    const skip = (page - 1) * limit;

    const paginated = sorted.slice(
      skip,
      skip + limit,
    );

    return {
      data: paginated.map((p) =>
        this.mapProperty(p),
      ),

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit,
        ),
      },
    };
  }

  /**
   * ============================
   * SIMULAÇÃO DE FINANCIAMENTO
   * ============================
   */

  async simulateFinancing(params: {
    renda_mensal: number;
    entrada: number;
    prazo_meses?: number;
  }) {
    const {
      renda_mensal,
      entrada,
      prazo_meses = 360,
    } = params;

    if (
      !renda_mensal ||
      renda_mensal <= 0
    ) {
      throw new BadRequestException(
        'Renda mensal inválida',
      );
    }

    if (
      entrada == null ||
      entrada < 0
    ) {
      throw new BadRequestException(
        'Valor de entrada inválido',
      );
    }

    const taxaAnual =
      renda_mensal <= 4700
        ? 8.35
        : 10.3;

    const taxaMensal =
      taxaAnual / 100 / 12;

    const properties =
      await this.prisma.property.findMany(
        {
          where: {
            status:
              PropertyStatus.DISPONIVEL,
          },

          include: {
            address: true,

            images: {
              orderBy: {
                sort_order: 'asc',
              },
            },

            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                creci: true,
                phone: true,
                whatsapp: true,
              },
            },
          },

          orderBy: {
            updated_at: 'desc',
          },
        },
      );

    const data = properties.map(
      (property) => {
        const valorImovel =
          Number(property.price);

        const entradaMinima =
          valorImovel * 0.2;

        const motivos: string[] =
          [];

        if (
          entrada < entradaMinima
        ) {
          motivos.push(
            'entrada insuficiente',
          );
        }

        const valorFinanciado = Math.max(
          valorImovel - entrada,
          0,
        );

        const parcela =
          valorFinanciado > 0
            ? (valorFinanciado *
              (taxaMensal *
                Math.pow(
                  1 + taxaMensal,
                  prazo_meses,
                ))) /
            (Math.pow(
              1 + taxaMensal,
              prazo_meses,
            ) -
              1)
            : 0;

        const percentualRenda =
          (parcela /
            renda_mensal) *
          100;

        if (
          percentualRenda > 30
        ) {
          motivos.push(
            'renda incompatível com a parcela',
          );
        }

        return {
          id_imovel: property.id,

          valor_imovel:
            valorImovel,

          valor_entrada_minima:
            Number(
              entradaMinima.toFixed(
                2,
              ),
            ),

          valor_parcela_calculada:
            Number(
              parcela.toFixed(2),
            ),

          taxa_de_juros:
            taxaAnual,

          valor_restante_apos_entrada:
            Number(
              valorFinanciado.toFixed(
                2,
              ),
            ),

          percentual_renda_comprometido:
            Number(
              percentualRenda.toFixed(
                2,
              ),
            ),

          status:
            motivos.length > 0
              ? 'não recomendado'
              : 'recomendado',

          motivo_caso_nao_recomendado:
            motivos,

          property:
            this.mapProperty(
              property,
            ),
        };
      },
    );

    return {
      data,

      meta: {
        total: data.length,
        prazo_meses,
        taxa_anual:
          taxaAnual,
      },
    };
  }

  private mapProperty(p: {
    id: string;
    title: string;
    description: string | null;
    property_type: string | null;
    price: unknown;
    area: unknown;
    bedrooms: number;
    status: string;
    created_at: Date;
    address: unknown;
    images: Array<{
      id: string;
      content_type: string | null;
      sort_order: number;
      image_url: string;
    }>;
    owner: {
      id: string;
      name: string | null;
      email: string;
      creci: string | null;
      phone: string | null;
      whatsapp: string | null;
    };
  }) {
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      property_type: p.property_type,
      price: Number(p.price),
      area: Number(p.area),
      bedrooms: p.bedrooms,
      status: p.status,
      created_at: p.created_at,
      address: p.address,

      images: p.images.map((img) => ({
        id: img.id,
        content_type:
          img.content_type,
        sort_order:
          img.sort_order,
        image_url:
          img.image_url,
      })),

      owner: p.owner,
    };
  }

  async findOne(id: string) {
    const property =
      await this.prisma.property.findUnique(
        {
          where: { id },

          include: {
            address: true,

            images: {
              orderBy: {
                sort_order: 'asc',
              },
            },

            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                creci: true,
                phone: true,
                whatsapp: true,
              },
            },
          },
        },
      );

    if (!property) {
      throw new NotFoundException(
        'Imóvel não encontrado',
      );
    }

    if (
      property.status !==
      PropertyStatus.DISPONIVEL &&
      property.status !==
      PropertyStatus.VENDIDO
    ) {
      throw new NotFoundException(
        'Imóvel não encontrado',
      );
    }

    const images =
      property.images.map((img) => ({
        id: img.id,
        filename: img.filename,
        content_type:
          img.content_type,
        size_bytes:
          img.size_bytes,
        width: img.width,
        height: img.height,
        sort_order:
          img.sort_order,
        created_at:
          img.created_at,
        image_url:
          img.image_url,
      }));

    return {
      id: property.id,
      title: property.title,
      description:
        property.description,
      property_type:
        property.property_type,
      price: Number(property.price),
      area: Number(property.area),
      bedrooms:
        property.bedrooms,
      status: property.status,
      created_at:
        property.created_at,
      updated_at:
        property.updated_at,
      address: property.address,
      images,
      owner: property.owner,
    };
  }
}