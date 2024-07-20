import Image from 'next/image'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}
//priority eager
const BlendImage = (props) => {


  return <Image  
      loading='lazy'   
      alt="fdd"
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" 
   loader={contentfulLoader} {...props} 
   width={400}
   height={200}
   style={{
    mixBlendMode:'var(--mix-blend-mode)'
  }}
   className='object-cover w-full h-full greyscale'
   />
}

export default BlendImage
