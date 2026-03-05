import img1 from '../assets/img_1.jpg'
import ScrollableImageStack from '../Components/ScrollableImageStack'
import DescriptionText from '../Components/DescriptionText'
import { aboutData } from '../Content/AboutSectionContent'

export default function AboutSection() {
  const images = [img1]

  return (
    <section id="about" className="bg-zinc-900 text-white min-h-screen">
      <div className="flex flex-col md:flex-row w-full relative">
        <div className="w-full min-h-screen md:w-1/2 md:h-screen md:sticky md:top-0 flex flex-col justify-center px-8 py-16 z-10 bg-zinc-900">
          <DescriptionText 
            title={aboutData.title}
            mainText={aboutData.mainText}
            subText={aboutData.subText}
          />
        </div>
        <ScrollableImageStack images={images} />
      </div>

    </section>
  )
}

