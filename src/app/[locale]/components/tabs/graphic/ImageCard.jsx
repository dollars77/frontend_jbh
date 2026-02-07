import Image from 'next/image'

function ImageCard({ item }) {
  return (
    <div className='relative'><Image alt='jbh' src={item.image} width={700} height={1065} /></div>
  )
}

ImageCard.propTypes = {}

export default ImageCard
