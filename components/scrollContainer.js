import { Lenis as ReactLenis, useLenis } from '@studio-freight/react-lenis'

export default function Layout({ children }) {

  const lenis = useLenis(({scroll}) => {
    // called every scroll
  })

  return (
    <ReactLenis root options={{ 
      smooth: true,
      infinite: true,
    }}>
      {/* Your scrollable website */}

      <Meta />
      <main>{children}</main>
      </ReactLenis>
  )
}