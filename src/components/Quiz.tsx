import { useState } from "react";

interface QuizProps {
  onComplete: (name: string, allCorrect: boolean) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const f1Teams = [
    "Red Bull Racing", "Mercedes", "Ferrari", "McLaren", 
    "Aston Martin", "Alpine", "Williams", "Visa Cash App RB", 
    "Kick Sauber", "Haas"
  ];

  const handleNext = (isCorrect: boolean) => {
    if (!isCorrect) setWrongAnswers((prev) => prev + 1);
    if (step === 5) {
      onComplete(name, wrongAnswers === 0 && isCorrect);
    } else {
      setStep(step + 1);
    }
  };

  if (isClosed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Acesso Negado. Feche a aba ou atualize a página se mudar de ideia.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-card border border-border rounded-lg p-8 shadow-lg">
        
        {step === 0 && (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-foreground">Bem-vindo(a)!</h2>
            <p className="text-muted-foreground">Para iniciarmos, qual o seu nome?</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-border rounded bg-background text-foreground focus:outline-none focus:border-primary"
              placeholder="Digite seu nome..."
            />
            <button
              onClick={() => name.trim() && setStep(1)}
              disabled={!name.trim()}
              className="w-full bg-primary text-primary-foreground py-3 rounded font-bold disabled:opacity-50"
            >
              Avançar
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-bold text-foreground">
              Olá, {name}! Antes de acessar a aplicação, você deverá responder algumas perguntas. Podemos começar?
            </h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setStep(2)} className="px-8 py-3 bg-primary text-primary-foreground rounded font-bold">
                Sim
              </button>
              <button onClick={() => setIsClosed(true)} className="px-8 py-3 bg-destructive text-destructive-foreground rounded font-bold">
                Não
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground text-center">
              1. Qual equipe irá ganhar o Mundial de Construtores?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {f1Teams.map((team) => (
                <button
                  key={team}
                  onClick={() => handleNext(team === "Ferrari")}
                  className="p-3 bg-muted hover:bg-accent hover:text-accent-foreground border border-border rounded text-sm font-medium transition-colors"
                >
                  {team}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-bold text-foreground">
              2. Neymar é o maior gênio da nossa seleção de futebol?
            </h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleNext(true)} className="px-8 py-3 bg-primary text-primary-foreground rounded font-bold">Sim</button>
              <button onClick={() => handleNext(false)} className="px-8 py-3 bg-secondary text-secondary-foreground rounded font-bold">Não</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-bold text-foreground">
              3. Você concorda que os R$50,00 transferidos para a compra do Jogo F1 25 foi, sem dúvidas, um gesto de bondade e benevolência e que não será cobrado em momento algum?
            </h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleNext(true)} className="px-8 py-3 bg-primary text-primary-foreground rounded font-bold">Sim</button>
              <button onClick={() => handleNext(false)} className="px-8 py-3 bg-secondary text-secondary-foreground rounded font-bold">Não</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 text-center">
            <h2 className="text-xl font-bold text-foreground">
              4. Dragon Ball é o melhor anime de todos?
            </h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleNext(true)} className="px-8 py-3 bg-primary text-primary-foreground rounded font-bold">Sim</button>
              <button onClick={() => handleNext(false)} className="px-8 py-3 bg-secondary text-secondary-foreground rounded font-bold">Não</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}