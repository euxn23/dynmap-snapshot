import { Images, imagesSubject } from '../subjects/images.ts'
import { fetchImages } from '../api/fetch-images.ts'
import { ImageContainer } from '../components/ImageContainer.tsx'
import { Center } from '../components/layout/Center.tsx'
import { Flex } from '@radix-ui/themes'
import { sub, top } from './Top.css'
import { heroImageSubject } from '../subjects/heroImage.ts'
import { useSubject } from '../subjects/connector.ts'

const imageTypes: Array<keyof Images> = ['home', 'flat', 'surface']
export function Top() {
  if (!imagesSubject.value) {
    throw fetchImages()
  }

  const heroImage = useSubject(heroImageSubject)

  return (
    <Flex direction="column" justify="center" align="center" width="100%" gap="4">
      <Flex direction="column" align="center" justify="center" className={top} gap="2">
        <Center>
          <ImageContainer type="home" images={imagesSubject.value[heroImage]} />
        </Center>
        <Flex gap="4">
          {imageTypes
            .filter((type) => type !== heroImage)
            .map((type) => (
              <ImageContainer key={type} className={sub} type={type} images={imagesSubject.value?.[type] ?? []} />
            ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
