import Image from 'next/image'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}
//priority eager
const BlendImageFill = (props) => {


  return <Image  
      loading='lazy'   
      alt="fdd"
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" 
   loader={contentfulLoader} {...props} 
   width={400}
   height={400}
   style={{
    mixBlendMode:'var(--mix-blend-mode)'
  }}
   className='w-full h-full'
   />
}

export default BlendImageFill
