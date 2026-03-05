export default function DescriptionText({ title, mainText, subText }) {
  return (
    <>
      <div className="max-w-3xl text-left pb-8">
        <p className="text-base font-medium font-secondary text-grey pb-4">
          {title}
        </p>
        <h2 className="text-5xl font-primary">
          {mainText}
        </h2>
      </div>
      <div className="max-w-3xs text-left" >
        <p className="text-base font-medium font-secondary text-grey">
          {subText}
        </p>
      </div>
    </>
  )
}
