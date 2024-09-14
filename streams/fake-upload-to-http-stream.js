import { Readable } from "node:stream"

class OneToHundredStream extends Readable {
  constructor() {
    super()
    this.current = 1
  }

  _read() {
    setTimeout(() => {
      if (this.current > 10) {
        this.push(null)
        return
      }

      const buf = Buffer.from(String(this.current))

      this.push(buf + "\n")
      this.current++
    }, 1000)
  }
}


fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: 'half'
})
  .then(res => res.text())
  .then(console.log)
