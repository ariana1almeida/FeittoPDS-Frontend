import TermsSection from "./TermsSection.tsx";

export default function PrivacyContent() {
    return (
        <div className="prose prose-sm max-w-none text-primary-dark space-y-6">
            <p className="text-base leading-relaxed">
                A sua privacidade é importante para nós. Esta <strong>Política de Privacidade</strong> descreve como a{' '}
                <strong>FEITTO</strong> ("nós", "nosso", "plataforma") coleta, usa, armazena e protege as informações
                pessoais dos usuários ("você") ao utilizar o site.
            </p>

            <p className="text-base leading-relaxed">
                Ao acessar ou usar o site, você concorda com as práticas descritas nesta política.
            </p>

            <TermsSection title="1. Informações que coletamos">
                <p>Podemos coletar os seguintes tipos de dados:</p>

                <div className="mt-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-primary-dark mb-2">🔹 1.1. Informações fornecidas pelo usuário</h4>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Nome completo;</li>
                            <li>E-mail e telefone;</li>
                            <li>Endereço (quando necessário para execução de serviços);</li>
                            <li>CPF ou CNPJ (em caso de emissão de nota fiscal ou cadastro de prestadores);</li>
                            <li>Dados de pagamento (quando aplicável).</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary-dark mb-2">🔹 1.2. Informações coletadas automaticamente</h4>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Endereço IP, tipo de navegador e sistema operacional;</li>
                            <li>Páginas acessadas e tempo de permanência;</li>
                            <li>Cookies e identificadores de sessão;</li>
                            <li>Dados de geolocalização (quando permitido pelo navegador/dispositivo).</li>
                        </ul>
                    </div>
                </div>
            </TermsSection>

            <TermsSection title="2. Finalidade do uso das informações">
                <p>Usamos os dados pessoais para:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Criar e gerenciar contas de usuários;</li>
                    <li>Facilitar a comunicação entre Clientes e Prestadores;</li>
                    <li>Processar pagamentos e emitir comprovantes (quando aplicável);</li>
                    <li>Melhorar a experiência de navegação e os serviços oferecidos;</li>
                    <li>Enviar notificações e comunicações relacionadas à plataforma;</li>
                    <li>Cumprir obrigações legais e regulatórias.</li>
                </ul>
            </TermsSection>

            <TermsSection title="3. Compartilhamento de informações">
                <p>Podemos compartilhar dados apenas nas seguintes situações:</p>
                <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li><strong>Com Prestadores ou Clientes</strong>, quando necessário para viabilizar a execução de um serviço;</li>
                    <li><strong>Com parceiros e fornecedores</strong>, que auxiliam na operação do site (ex: hospedagem, meios de pagamento), sob contrato de confidencialidade;</li>
                    <li><strong>Por obrigação legal</strong>, mediante requisição de autoridades competentes;</li>
                    <li><strong>Em caso de fusão ou venda da empresa</strong>, garantiremos que a nova controladora respeite esta política.</li>
                </ol>
                <p className="mt-3">Não vendemos nem alugamos seus dados pessoais a terceiros.</p>
            </TermsSection>

            <TermsSection title="4. Armazenamento e segurança dos dados">
                <ul className="list-disc pl-6 space-y-2">
                    <li>Os dados são armazenados em <strong>servidores seguros</strong>, podendo estar localizados no Brasil ou no exterior.</li>
                    <li>Adotamos medidas técnicas e administrativas de segurança para proteger suas informações contra acessos não autorizados, perdas ou alterações.</li>
                    <li>Apesar dos nossos esforços, <strong>nenhum sistema é 100% seguro</strong>. Em caso de incidente de segurança, notificaremos os usuários afetados conforme previsto na <strong>Lei nº 13.709/2018 (LGPD)</strong>.</li>
                </ul>
            </TermsSection>

            <TermsSection title="5. Retenção dos dados">
                <p>Os dados pessoais serão mantidos:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Pelo tempo necessário para cumprir as finalidades informadas nesta política;</li>
                    <li>Enquanto durar o relacionamento entre o usuário e a plataforma;</li>
                    <li>Enquanto houver obrigações legais ou regulatórias que exijam sua conservação.</li>
                </ul>
                <p className="mt-3">Após esse período, os dados poderão ser anonimizados ou excluídos de forma segura.</p>
            </TermsSection>

            <TermsSection title="6. Direitos do titular dos dados">
                <p>Conforme a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>, o usuário pode:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Confirmar se tratamos seus dados pessoais;</li>
                    <li>Solicitar o acesso, correção ou exclusão dos dados;</li>
                    <li>Solicitar a portabilidade para outro fornecedor;</li>
                    <li>Revogar o consentimento para uso dos dados;</li>
                    <li>Solicitar informações sobre compartilhamento de dados.</li>
                </ul>
                <p className="mt-3">
                    Esses pedidos podem ser feitos pelo e-mail:{' '}
                    <a href="mailto:contato@feitto.com.br" className="text-primary-dark hover:underline">
                        📧 contato@feitto.com.br
                    </a>
                </p>
            </TermsSection>

            <TermsSection title="7. Uso de cookies">
                <p>
                    Usamos <strong>cookies</strong> para melhorar a experiência do usuário. Você pode configurar seu
                    navegador para bloquear ou apagar cookies, mas isso pode limitar o funcionamento de algumas partes do site.
                </p>
                <p className="mt-3">Os tipos de cookies que usamos incluem:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site.</li>
                    <li><strong>Cookies de desempenho:</strong> coletam informações sobre como o site é usado.</li>
                    <li><strong>Cookies de marketing:</strong> ajudam a personalizar anúncios ou comunicações (quando aplicável).</li>
                </ul>
            </TermsSection>

            <TermsSection title="8. Links externos">
                <p>
                    Nosso site pode conter links para sites de terceiros. Não nos responsabilizamos pelas práticas de
                    privacidade desses sites. Recomendamos que você leia as políticas de cada um antes de fornecer qualquer
                    informação pessoal.
                </p>
            </TermsSection>

            <TermsSection title="9. Alterações nesta Política">
                <p>
                    Podemos alterar esta Política de Privacidade a qualquer momento. A versão mais recente sempre estará
                    disponível nesta página, com a data da última atualização.
                </p>
                <p className="mt-2">
                    O uso continuado da plataforma após alterações implica concordância com a nova versão.
                </p>
            </TermsSection>

            <TermsSection title="10. Contato">
                <p>
                    Em caso de dúvidas sobre esta Política ou sobre o tratamento dos seus dados pessoais, entre em contato
                    com nosso Encarregado de Proteção de Dados (DPO):<br />
                    📧 <a href="mailto:contato@feitto.com.br" className="text-primary-dark hover:underline">
                    contato@feitto.com.br
                </a>
                </p>
            </TermsSection>
        </div>
    );
}
