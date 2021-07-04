import isUrl from 'is-url'
import crypto from 'crypto'


export default function (data: any): Upload {
  // data = 'https://url.images'
  const validFormatedUrlString = typeof data === 'string' && isUrl(data)
  if (validFormatedUrlString) {
    return {
      code: 1,
      data: [data],
    }
  }

  // data = ['https://', 'http://', 'https://']
  const isArrayOfUrlString = data.every(isUrl)
  if (isArrayOfUrlString) {
    return {
      code: 1,
      data,
    }
  }

  // data = [{ filename: 'asda.jpg', url: 'https://' }, { filename: 'asda.jpg', url: 'https://'}]
  const isObjectWithUrl = data.every(
    (value: { filename: any; url: string }) => {
      return value.filename && isUrl(value.url)
    }
  )
  if (isObjectWithUrl) {
    return {
      code: 2,
      data,
    }
  }

  // data = [{ filename: 'asda.jpg', buffer: Buffer }, { filename: 'asda.jpg', buffer: Buffer }]
  const isObjectWithBuffer = data.every(
    (value: { filename: any; buffer: Buffer }) => {
      return value.filename && Buffer.isBuffer(value.buffer)
    }
  )
  if (isObjectWithBuffer) {
    return {
      code: 3,
      data,
    }
  }
  // data = [ Buffer, Buffer, Buffer ]
  const isArrayOfBuffer = data.every((value: { buffer: Buffer }) => {
    return Buffer.isBuffer(value.buffer)
  })
  if (isArrayOfBuffer) {
    return {
      code: 3,
      data: data.map((buffer: Buffer) => {
        return {
          filename: crypto.randomUUID() + '.jpg',
          buffer,
        }
      }),
    }
  }

  // data = Buffer
  const isBuffer = Buffer.isBuffer(data)
  if (isBuffer) {
    return {
      code: 3,
      data: [
        {
          filename: crypto.randomUUID() + '.jpg',
          buffer: data,
        },
      ],
    }
  }

  return {
    code: 0,
    data: [],
  }
}
