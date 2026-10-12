import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faq } from "@/content/faq"

export function Faq() {
  return (
    <Accordion className="border-y border-line">
      {faq.map((entry) => (
        <AccordionItem key={entry.q} value={entry.q} className="border-line">
          <AccordionTrigger className="py-5 text-[17px] font-medium tracking-tight hover:no-underline">{entry.q}</AccordionTrigger>
          <AccordionContent className="max-w-[68ch] pb-6 text-[16px] leading-relaxed text-muted-foreground">{entry.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
