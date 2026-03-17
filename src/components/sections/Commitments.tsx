import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Card } from '../ui/Card'
import { Animate } from '../ui/Animate'

interface CommitmentsProps {
  t: {
    commitments: {
      label: string
      title: string
      items: { icon: string; title: string; desc: string }[]
    }
  }
}

export function Commitments({ t }: CommitmentsProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-dark via-[#0e150a] to-dark px-6">
      <Container>
        <SectionHeader label={t.commitments.label} title={t.commitments.title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.commitments.items.map((item, i) => (
            <Animate key={i} delay={i * 0.1}>
              <Card className="p-7 text-center h-full">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-sans font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="font-sans text-sm text-white/45 leading-relaxed">{item.desc}</p>
              </Card>
            </Animate>
          ))}
        </div>
      </Container>
    </section>
  )
}
