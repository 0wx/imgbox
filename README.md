
# IMGBOX

An unofficial library to easily upload files to [imgbox.com](https://imgbox.com)


## Installation 

Install `imgbox` with npm

```bash 
  npm install imgbox
```
    
## Usage/Examples

import or require the library
```javascript
const { imgbox } = require('imgbox')

// or

import { imgbox } from 'imgbox'
```
Using Buffer:
```javascript
imgbox(fs.readFileSync('./tes.jpg'))
    .then(data => console.log(data))
```
To specify filename:
```javascript
const file = {
        filename: 'tes.jpg',
        buffer: fs.readFileSync('./tes.jpg')
    }

imgbox(file)
    .then(data => console.log(data))
```

Multiple files:
```javascript
const files = [Buffer, Buffer, Buffer, ...]

imgbox(files)
    .then(data => console.log(data))
```
Multiple files with specified name:
```javascript
const files = [
    {
        filename: 'tes1.jpg',
        buffer: Buffer,
    },
    {
        filename: 'tes2.jpg',
        buffer: Buffer,
    },
    {
        filename: 'tes3.jpg',
        buffer: Buffer,
    },
]

imgbox(files)
    .then(data => console.log(data))
```
Using image URL:
```javascript
imgbox('https://picsum.photos/200')
    .then(data => console.log(data))
```
To specify filename with image url:
```javascript
const file = {
        filename: 'tes.jpg',
        url: 'https://picsum.photos/200'
    }
    
imgbox(file)
    .then(data => console.log(data))
```
To upload multiple files url:
```javascript
const files = [
    'https://picsum.photos/200', 
    'https://picsum.photos/300',
    'https://picsum.photos/400',
    ]

imgbox(files)
    .then(data => console.log(data))
```
To upload multiple files url with specified name
```javascript
const files = [
    {
        filename: 'tes1.jpg',
        url: 'https://picsum.photos/200',
    },
    {
        filename: 'tes2.jpg',
        url: 'https://picsum.photos/300',
    },
    {
        filename: 'tes3.jpg',
        url: 'https://picsum.photos/400',
    },
]

imgbox(files)
    .then(data => console.log(data))
```

Example response:
```json
{
  "ok": true,
  "gallery_edit": "https://imgbox.com/gallery/edit/qxxxxx/Zxxxxxxx",
  "files": [
    {
      "id": "nR8EAQjx",
      "slug": "nR8EAQjx",
      "name": "tes.jpg",
      "name_html_escaped": "925-200x200.jpg",
      "created_at": "2021-07-02T08:42:36.468Z",
      "created_at_human": "July 02, 2021 08:42",
      "updated_at": "2021-07-02T08:42:37.638Z",
      "gallery_id": "qSO2k2NDxX",
      "url": "https://imgbox.com/xxx",
      "original_url": "https://images2.imgbox.com/23/dd/xxx_o.jpg",
      "thumbnail_url": "https://thumbs2.imgbox.com/23/dd/xxx_t.jpg",
      "square_url": "https://thumbs2.imgbox.com/23/dd/xxx_b.jpg",
      "selected": false,
      "comments_enabled": 0,
      "comments_count": 0
    },
    {
      "id": "nR8EAQjx",
      "slug": "nR8EAQjx",
      "name": "tes2.jpg",
      "name_html_escaped": "925-200x200.jpg",
      "created_at": "2021-07-02T08:42:36.468Z",
      "created_at_human": "July 02, 2021 08:42",
      "updated_at": "2021-07-02T08:42:37.638Z",
      "gallery_id": "qSO2k2NDxX",
      "url": "https://imgbox.com/xxx",
      "original_url": "https://images2.imgbox.com/23/dd/xxx_o.jpg",
      "thumbnail_url": "https://thumbs2.imgbox.com/23/dd/xxx_t.jpg",
      "square_url": "https://thumbs2.imgbox.com/23/dd/xxx_b.jpg",
      "selected": false,
      "comments_enabled": 0,
      "comments_count": 0
    }
  ]
}
```
  