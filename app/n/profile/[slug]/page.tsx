import { OtherUserProfile } from "@/components/profiles/OtherUserProfile";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const CommunitiesDetailsPage = async ({ params }: PageProps) => {
const { slug } = await params;
console.log(slug);
// const matchedProduct = mockProducts.find(product => product.id === slug);
// if (!matchedProduct) {
//     return <div>Product not found</div>;
//   }

  return (
    <div>
        <OtherUserProfile slug={slug} />
    </div>
  )
}

export default CommunitiesDetailsPage