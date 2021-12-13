import Header from "../partials/Header";
import Footer from "../partials/Footer";

export default function StandardLayout({children}) {
    return (
        <>
            <Header/>

                    {children}

            <Footer/>
        </>
    )
}