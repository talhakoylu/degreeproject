import {useRouter} from "next/router";
import StandardLayout from "../../components/layouts/StandardLayout";

const CategorySlug = ()=>{
    const router = useRouter();
    const {category_slug} = router.query;

    return(
        <StandardLayout>
            Category: {category_slug}
        </StandardLayout>
    )
}

export default CategorySlug