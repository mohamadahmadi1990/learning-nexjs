export interface IProps {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function AllSlug({ params }: IProps) {
  const { slug = [] } = await params
  console.log(await params)

  return (
    <ul className="flex flex-row">
      {slug.map((item, index) => (
        <li key={index}>{`/${item}`}</li>
      ))}
    </ul>
  )
}
