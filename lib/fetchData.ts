import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

const urls = [
  "https://www.ntv.com.tr/son-dakika.rss",
  // Diğer 8 linki buraya ekleyin
]

export async function fetchData() {
  const data: any[] = []

  for (const url of urls) {
    const response = await fetch(url)
    const text = await response.text()
    const dom = new JSDOM(text, { contentType: "application/xml" })
    const items = dom.window.document.querySelectorAll("item")

    items.forEach((item, index) => {
      const description = item.querySelector("description")
      if (description && description.textContent) {
        const domDescription = new JSDOM(description.textContent)
        const p = domDescription.window.document.querySelector("p")
        if (p && p.textContent) {
          data.push({
            id: index.toString(),
            content: p.textContent
          })
        }
      }
    })
  }

  return data
}