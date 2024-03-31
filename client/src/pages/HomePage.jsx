import Navbar from "../components/Navbar"
import Slide from "../components/Slide"
import Categories from "../components/Categories"
import Listings from "../components/Listings"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Slide/>
      <Categories/>
      <Listings/>
      <Footer/>
    </>
  )
}
