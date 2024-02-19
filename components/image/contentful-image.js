import Image from 'next/image'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}
//priority eager
const ContentfulImage = (props) => {
  return <Image  
      loading='lazy'   
      
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw" 
   loader={contentfulLoader} {...props} 
   width={400}
   height={200}
   className='w-full h-full object-cover greyscale'
   />
}

export default ContentfulImage
