
import { AboutLayout } from "components/AboutLayout"


function About() {
  return <div>About</div>
}

export default About





About.getLayout = (page: React.ReactNode) => <AboutLayout>{page}</AboutLayout>