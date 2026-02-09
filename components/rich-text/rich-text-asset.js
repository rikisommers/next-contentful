import Image from 'next/image'

export default function RichTextAsset({ id, assets }) {
  const asset = assets?.find((asset) => asset.sys.id === id)

  if (asset?.url) {
    return (
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <Image src={asset.url} fill alt={asset.description || ''} sizes="(max-width: 768px) 100vw, 800px" />
      </div>
    )
  }

  return null
}
