import { getSkills, getExperience, getPersonalInfo } from '@/lib/supabase'

// SSG: Generate static page at build time
export const revalidate = false // Static generation

// Server-side data fetching for SSG
async function getAboutPageData() {
  try {
    const [skillsData, experienceData, personalData] = await Promise.all([
      getSkills(),
      getExperience(),
      getPersonalInfo()
    ]);
    
    return {
      skills: skillsData,
      experience: experienceData,
      personalInfo: personalData
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      skills: [],
      experience: [],
      personalInfo: null
    };
  }
}

export default async function About() {
  const { skills, experience, personalInfo } = await getAboutPageData();

  const formatDateRange = (startDate: string, endDate?: string, current?: boolean) => {
    const start = new Date(startDate).getFullYear();
    if (current) {
      return `${start} - Present`;
    }
    const end = endDate ? new Date(endDate).getFullYear() : start;
    return `${start} - ${end}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Passionate developer with 5+ years of experience creating digital solutions that make a difference.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 animate-fade-in-up animation-delay-200">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">My Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I&apos;m M.Zanaen Ullah, a passionate full-stack developer and UI/UX designer based in Pakistan. 
                  My journey into tech started during college when I built my first website for a local business.
                </p>
                <p>
                  Over the years, I&apos;ve had the privilege of working with startups, agencies, and enterprise companies, 
                  helping them bring their digital visions to life. I believe in writing clean, maintainable code 
                  and creating user experiences that are both beautiful and functional.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or hiking in the beautiful mountains on the northen side of Pakistan.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Profile Image Placeholder */}
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-6xl">👨‍💻</div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{personalInfo?.name || 'Alex Johnson'}</h3>
                <p className="text-gray-600">{personalInfo?.title || 'Full-Stack Developer & UI/UX Designer'}</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">20+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20 animate-fade-in-up animation-delay-400">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Experience Timeline</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index !== experience.length - 1 && (
                  <div className="absolute left-4 top-16 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg card-hover">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 sm:mt-0">
                        {formatDateRange(exp.start_date, exp.end_date, !exp.end_date)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Core Skills</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-800">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Let&apos;s Work Together</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects. 
            Let&apos;s discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-4 bg-black text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-xl">
              Get In Touch
            </a>
            <a href="/projects" className="px-8 py-4 border-2 border-black text-black rounded-full font-semibold transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl">
              View My Work
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}