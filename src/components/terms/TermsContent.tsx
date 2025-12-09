import TermsSection from "./TermsSection.tsx";

export default function TermsContent() {
    return (
        <div className="prose prose-sm max-w-none text-primary-dark space-y-6">
            <p className="text-base leading-relaxed">
                Bem-vindo ao <strong>FEITTO</strong> ("Plataforma"). Estes Termos e Condições regulam o uso do site e dos
                serviços oferecidos por <strong>Ariana Quadros de Almeida</strong> com sede em Xangri-Lá - RS.
            </p>

            <p className="text-base leading-relaxed">
                Ao acessar ou utilizar este site, o <strong>usuário</strong> declara ter lido, entendido e concordado com todas
                as disposições destes Termos e da <strong>Política de Privacidade</strong>.
            </p>

            <TermsSection title="1. Definições">
                <p>Para melhor compreensão deste documento, aplicam-se as seguintes definições:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Usuário:</strong> pessoa física ou jurídica que acessa o site, seja para solicitar ou oferecer serviços.</li>
                    <li><strong>Cliente:</strong> usuário que solicita a execução de um serviço.</li>
                    <li><strong>Prestador:</strong> usuário que oferece seus serviços por meio da plataforma.</li>
                    <li><strong>Plataforma:</strong> ambiente online que intermedeia a conexão entre Clientes e Prestadores.</li>
                </ul>
            </TermsSection>

            <TermsSection title="2. Objeto">
                <p>
                    A plataforma tem como objetivo <strong>conectar Clientes a Prestadores de serviços domésticos e de
                    manutenção em geral</strong>, facilitando a contratação e a comunicação entre as partes.
                </p>
                <p className="mt-2">
                    A <strong>FEITTO</strong> <strong>não executa serviços diretamente</strong>, atuando apenas como
                    intermediadora tecnológica entre as partes.
                </p>
            </TermsSection>

            <TermsSection title="3. Cadastro e Conta de Usuário">
                <ol className="list-decimal pl-6 space-y-2">
                    <li>Para utilizar determinadas funcionalidades, o usuário deve se cadastrar informando dados verdadeiros, completos e atualizados.</li>
                    <li>O usuário é responsável pela veracidade das informações fornecidas e pela guarda de suas credenciais de acesso.</li>
                    <li>É proibido compartilhar sua conta com terceiros.</li>
                    <li>A plataforma poderá suspender ou excluir contas que apresentem informações falsas, uso indevido ou descumprimento destes Termos.</li>
                </ol>
            </TermsSection>

            <TermsSection title="4. Responsabilidades dos Usuários">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-primary-dark mb-2">4.1. Clientes</h4>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Fornecer informações claras e precisas sobre o serviço solicitado.</li>
                            <li>Efetuar os pagamentos de forma correta (quando aplicável).</li>
                            <li>Avaliar os Prestadores de maneira justa e respeitosa.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-primary-dark mb-2">4.2. Prestadores</h4>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Cumprir os serviços contratados de forma profissional e dentro do prazo combinado.</li>
                            <li>Garantir a veracidade das informações sobre suas qualificações e experiências.</li>
                            <li>Respeitar as leis aplicáveis e os direitos dos Clientes.</li>
                        </ul>
                    </div>
                </div>
            </TermsSection>

            <TermsSection title="5. Responsabilidade da Plataforma">
                <p>A <strong>FEITTO</strong>:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Atua apenas como <strong>intermediadora</strong>, <strong>não sendo parte dos contratos firmados</strong> entre Clientes e Prestadores.</li>
                    <li><strong>Não garante a qualidade, pontualidade ou resultado dos serviços executados</strong> pelos Prestadores.</li>
                    <li><strong>Não se responsabiliza</strong> por danos diretos, indiretos, materiais ou morais decorrentes de relações entre os usuários.</li>
                    <li>Poderá, a qualquer momento, suspender temporariamente a plataforma para manutenção, atualização ou segurança.</li>
                </ul>
            </TermsSection>

            <TermsSection title="6. Condutas Proibidas">
                <p>O usuário concorda em <strong>não utilizar a plataforma</strong> para:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Praticar atos ilícitos, ofensivos, difamatórios ou discriminatórios;</li>
                    <li>Publicar informações falsas ou enganosas;</li>
                    <li>Copiar, modificar ou distribuir conteúdos sem autorização;</li>
                    <li>Usar o site para fins fraudulentos ou para prejudicar terceiros.</li>
                </ul>
                <p className="mt-3">
                    O descumprimento destas regras poderá resultar em <strong>suspensão ou exclusão definitiva da conta</strong>.
                </p>
            </TermsSection>

            <TermsSection title="7. Propriedade Intelectual">
                <p>
                    Todos os elementos da plataforma — textos, logotipos, imagens, ícones, layout e código-fonte — são de
                    propriedade da <strong>FEITTO</strong> e protegidos pelas leis de direitos autorais e propriedade intelectual.
                </p>
                <p className="mt-2">É proibida qualquer reprodução ou uso sem autorização prévia e expressa.</p>
            </TermsSection>

            <TermsSection title="8. Privacidade e Proteção de Dados">
                <p>
                    Os dados pessoais dos usuários são tratados de acordo com a <strong>Lei Geral de Proteção de Dados
                    (Lei nº 13.709/2018)</strong>.
                </p>
                <p className="mt-2">
                    Mais detalhes sobre a coleta, uso e armazenamento de informações estão descritos na nossa
                    <strong> Política de Privacidade</strong>.
                </p>
            </TermsSection>

            <TermsSection title="9. Modificações nos Termos">
                <p>A <strong>FEITTO</strong> poderá alterar estes Termos a qualquer momento.</p>
                <p className="mt-2">As alterações entrarão em vigor na data de sua publicação no site.</p>
                <p className="mt-2">
                    O uso contínuo da plataforma após as mudanças representa a aceitação das novas condições.
                </p>
            </TermsSection>

            <TermsSection title="10. Encerramento da Conta">
                <p>O usuário pode solicitar o encerramento de sua conta a qualquer momento.</p>
                <p className="mt-2">
                    A <strong>FEITTO</strong> também poderá encerrar contas inativas ou que violem estes Termos,
                    sem necessidade de aviso prévio.
                </p>
            </TermsSection>

            <TermsSection title="11. Legislação Aplicável e Foro">
                <p>
                    Estes Termos são regidos pelas leis da <strong>República Federativa do Brasil</strong>.
                </p>
                <p className="mt-2">
                    Fica eleito o foro da Comarca de <strong>[sua cidade/UF]</strong> como competente para dirimir
                    quaisquer controvérsias relativas a este documento.
                </p>
            </TermsSection>

            <TermsSection title="12. Contato">
                <p>
                    Em caso de dúvidas, entre em contato conosco pelo e-mail:<br />
                    📧 <a href="mailto:contato@feitto.com.br" className="text-primary-dark hover:underline">
                    contato@feitto.com.br
                </a>
                </p>
            </TermsSection>
        </div>
    );
}