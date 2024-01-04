import { Images, imagesSubject } from '../subjects/images.ts'
import { fetchImages } from '../api/fetch-images.ts'
import { ImageContainer } from '../components/ImageContainer.tsx'
import { Center } from '../components/layout/Center.tsx'
import { Flex, Text } from '@radix-ui/themes'
import { footer, header, sub, title, top } from './Top.css'
import { heroImageSubject } from '../subjects/heroImage.ts'
import { useSubject } from '../subjects/connector.ts'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Helmet } from 'react-helmet-async'
import { R2_ENDPOINT } from '../env'

const imageTypes: Array<keyof Images> = ['home', 'flat', 'surface']

export function Top() {
  const images = imagesSubject.value

  if (!images) {
    throw fetchImages()
  }

  const heroImage = useSubject(heroImageSubject)

  return (
    <>
      <Helmet>
        <title>揺光</title>
        <meta property="og:title" content="揺光" />
        <meta property="og:site_name" content="揺光" />
        <meta property="og:url" content="https://history.minecraft.youkou.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${R2_ENDPOINT}/${images.home[0]}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="揺光" />
        <meta name="twitter:site" content="@euxn23" />
      </Helmet>
      <Flex direction="column" justify="center" align="center" width="100%" gap="4">
        <Flex direction="column" align="center" justify="center" width="100%" className={header}>
          <Text className={title}>揺光</Text>
        </Flex>
        <Flex direction="column" align="center" justify="center" className={top} gap="2">
          <Center>
            <ImageContainer type={heroImage} images={images[heroImage]} />
          </Center>
          <Flex gap="4">
            {imageTypes
              .filter((type) => type !== heroImage)
              .map((type) => (
                <ImageContainer key={type} className={sub} type={type} images={images[type] ?? []} />
              ))}
          </Flex>
        </Flex>
        <Flex direction="column" align="center" justify="center" width="100%" className={footer}>
          <Text as="p">
            <a href="https://github.com/euxn23/dynmap-snapshot/tree/main/ui" target="_blank">
              <GitHubLogoIcon />
            </a>
          </Text>
          <Text as="p">&copy;2024 euxn23</Text>
        </Flex>
      </Flex>
    </>
  )
}
