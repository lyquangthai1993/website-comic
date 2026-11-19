import type { Metadata } from 'next'
import '../styles.css'
import '../font-overrides.css'

export const metadata: Metadata = {
  title: 'Mực & Khung — Truyện tranh có dư âm',
  description: 'Truyện tranh Việt chọn lọc cho những người thích đọc chậm và nhớ lâu.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
