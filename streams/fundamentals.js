// importação de clientes via CSV
// Readable Stream / Writable Stream

// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform, Duplex } from "node:stream"

class OneToHundredStream extends Readable {
  constructor() {
    super()
    this.current = 1
  }

  _read() {
    setTimeout(() => {
      if (this.current > 100) {
        this.push(null)
        return
      }

      const buf = Buffer.from(String(this.current))

      this.push(buf + "\n")
      this.current++
    }, 1000)
  }
}

class MultiplyByTwoStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString())
    const result = number * 2
    console.log(result)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString())
    const result = number * -1
    callback(null, Buffer.from(String(result)))
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTwoStream())
