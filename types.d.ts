declare module 'types-imgbox' {
  export interface Token {
    ok: boolean
    token_id: number
    token_secret: string
    gallery_id: string
    gallery_secret: string
    message?: string
  }

  export interface Images {
    filename: string
    buffer: Buffer
  }

  export type Files =
    | string[]
    | string
    | Buffer[]
    | Buffer
    | Images[]
    | Images
    | ImagesURL[]
    | ImagesURL

  export interface Upload {
    code: number
    data: any[]
  }

  export interface FinalResult {
    ok: boolean
    message?: string
    gellery_edit?: string
    files?: any[]
  }

  export interface Images {
    filename: string
    buffer: Buffer
  }
}
