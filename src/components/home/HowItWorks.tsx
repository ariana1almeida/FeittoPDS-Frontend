import { Search, Calendar, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const steps = [
    {
        icon: Search,
        title: "Busque o serviço",
        description: "Encontre o profissional perfeito para sua necessidade",
    },
    {
        icon: Calendar,
        title: "Agende online",
        description: "Escolha o melhor horário e confirme o agendamento",
    },
    {
        icon: CheckCircle,
        title: "Avalie e pronto",
        description: "Receba o serviço e compartilhe sua experiência",
    },
];

export function HowItWorks() {
    return (
        <section className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-primary-dark mb-4 text-3xl sm:text-4xl">
                        Como funciona
                    </h2>
                    <p className="text-primary-dark max-w-2xl mx-auto text-base sm:text-lg">
                        Três passos simples para resolver suas necessidades
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative"
                        >
                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 bg-accent-yellow rounded-full flex items-center justify-center shadow-lg">
                                        <step.icon className="h-10 w-10 text-primary-dark" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center shadow-md">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-primary-dark mb-3 text-xl font-medium">
                                    {step.title}
                                </h3>
                                <p className="text-primary-dark leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent-yellow to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}