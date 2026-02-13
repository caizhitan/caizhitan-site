export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-zinc-900 text-white p-16 flex flex-col items-start justify-center">
      <div className="max-w-3xl text-left pb-8">
        <h2 className="text-5xl font-primary text-white">Engineer,</h2>
        <h2 className="text-5xl font-primary text-white">Lifelong Learner</h2>
        <h2 className="text-5xl font-cursive text-white">and</h2>
        <h2 className="text-5xl font-primary text-white">Coffee Lover</h2>
      </div>
      <div className="max-w-3xs text-left" >
        <p className="text-base font-medium font-secondary text-grey">
          <span className="font-bold text-white">EEE Student</span> @ Nanyang Technology University
        </p>
        <p className="text-base font-medium font-secondary pt-2 text-grey">
            BASED IN SINGAPORE
          </p>
        </div>
    </section>
  )
}
