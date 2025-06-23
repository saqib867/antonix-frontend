import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const projects = [
  {
    title: "Invest.in",
    description:
      "UX and UI design and development of a WordPress-based CRM system for investment brokers and their clients.",
    image:
      "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-28/246/780/710/915/52/100040813277b0.jpg", // replace with real path
  },
  {
    title: "Elektro-M",
    description:
      "Web development for a company offering photovoltaic project solutions with professional installation.",
    image:
      "https://www.ixbt.com/img/n1/news/2024/6/2/ckrq17ssi5cev0rqqxp368mnh-lc-300-front-34-ret-turneddesktop_large.jpg",
  },
  {
    title: "Proficon",
    description:
      "Web development for a company specializing in producing products from high-quality architectural concrete.",
    image:
      "https://avatars.mds.yandex.net/i?id=33ed4b1f59e0d157179878f64acca0c88cb55563-5515210-images-thumbs&n=13",
  },
];

export default function ProjectShowcase() {
  return (
    <section className="bg-gradient-to-b  py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="rounded-xl group relative p-1 overflow-hidden  hover:bg-[#1b1547] hover:bg-black/25  border-0 transition transform"
          >
            <div className="relative group  hover:scale-[1.09] duration-500  transition-all p-5 px-5 ">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover rounded-lg hover:shadow-2xl shadow-neutral-800   "
              />
            </div>
            <CardContent className="text-center p-6 ">
              <CardTitle className="text-white text-2xl font-semibold">
                {project.title}
              </CardTitle>
              <CardDescription className="text-gray-300 text-base mt-4">
                {project.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
