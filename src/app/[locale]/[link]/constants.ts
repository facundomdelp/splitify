export type SeoCta = 'quick' | 'groups'

export type SeoRoute = {
  key: string
  cta: SeoCta
  slug: string
  title: string
  description: string
  firstParagraph: string
  secondParagraph: string
}

export const SEO_ROUTES: Record<string, SeoRoute[]> = {
  en: [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'bill-split-calculator',
      title: 'Bill Split Calculator',
      description: 'Easily split bills among friends with our online calculator.',
      firstParagraph:
        'One person pays, then someone covers the next round, then a third gets the taxi. By the end nobody is quite sure who is up and who is down, and the group chat fills with screenshots of a notes app.',
      secondParagraph:
        'Type in each name and what they paid. That is the whole setup. Splitify works out the balance to the cent and tells you the shortest set of payments that clears it, whether it is dinner, a holiday or the rent.',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'split-rent-with-roommates',
      title: 'Split Rent with Roommates',
      description: 'Work out who pays what for rent, bills and shared costs.',
      firstParagraph:
        'Sharing a flat is more than splitting the rent down the middle. Utilities arrive at different times, one person covers the internet, another keeps buying things for the kitchen, and by the end of the month nobody remembers who paid for what.',
      secondParagraph:
        'Add every shared cost as it happens and let Splitify work out the balance. You get exactly who owes whom and how much, using as few transfers as possible, so settling up takes a minute instead of turning into an argument.',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'split-expenses-group-trip',
      title: 'Split Expenses on a Group Trip',
      description: 'Keep holiday costs fair without keeping a spreadsheet.',
      firstParagraph:
        'On a trip someone always pays for the flights, someone else books the house, and a third person keeps covering taxis and dinners. Trying to reconstruct all of it on the last night is how good holidays end badly.',
      secondParagraph:
        'Log each expense while it is still fresh and share the group link so everyone can add their own. Splitify keeps a running balance, and when the trip ends you get a short list of payments that settles everything.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'split-restaurant-bill',
      title: 'Split a Restaurant Bill',
      description: 'Divide the bill fairly, even when everyone ordered differently.',
      firstParagraph:
        'The bill arrives, one card pays for all of it, and then the maths begins. Splitting evenly is easy but rarely fair when one person had a starter and two drinks and someone else had a salad.',
      secondParagraph:
        'Enter what each person actually spent, or share a single item between only the people who had it. Splitify handles the rounding down to the cent and tells you exactly who owes the person who paid.',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'who-owes-who-calculator',
      title: 'Who Owes Who Calculator',
      description: 'Turn a messy list of payments into the fewest transfers.',
      firstParagraph:
        'When several people have paid for different things, working out the final balance by hand is slow and easy to get wrong. Most groups end up sending far more transfers than they actually need.',
      secondParagraph:
        'Splitify works out the net position for everybody and then finds the shortest way to settle it. Instead of six payments going in circles you might only need two. No account, no sign-up, just the answer.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'split-bill-unequally',
      title: 'Split a Bill Unequally',
      description: 'Share a cost between only the people it belongs to.',
      firstParagraph:
        'Not every expense belongs to everyone. Three of you shared a taxi while the rest walked, two people took the room with the balcony, one person did not drink. Splitting the whole trip evenly quietly overcharges somebody every time.',
      secondParagraph:
        'Add the expense, then pick exactly who it is shared with. Everything else stays split across the group as normal, and the final balance accounts for both. Nobody has to argue about the taxi, and nobody has to keep a private tally.',
    },
  ],
  es: [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'dividir-gastos-entre-amigos',
      title: 'Dividir Gastos entre Amigos',
      description: 'Divide los gastos de forma justa con nuestra herramienta online.',
      firstParagraph:
        'Una persona paga, después otra pone la siguiente ronda, y una tercera se hace cargo del taxi. Al final nadie tiene claro quién está a favor y quién en contra, y el grupo se llena de capturas de una nota del celular.',
      secondParagraph:
        'Escribe cada nombre y cuánto puso. Eso es todo. Splitify calcula el balance hasta el centavo y te dice la menor cantidad de pagos que dejan todo saldado, sea una cena, un viaje o el alquiler.',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'dividir-el-alquiler-entre-companeros',
      title: 'Dividir el Alquiler entre Compañeros',
      description: 'Calcula quién paga qué del alquiler, los servicios y los gastos comunes.',
      firstParagraph:
        'Compartir departamento es mucho más que dividir el alquiler por la mitad. Los servicios llegan en fechas distintas, una persona paga el internet, otra compra todo para la cocina, y a fin de mes nadie recuerda quién pagó qué.',
      secondParagraph:
        'Anota cada gasto compartido en el momento y deja que Splitify calcule el balance. Vas a ver exactamente quién le debe a quién y cuánto, con la menor cantidad de transferencias posible, para que saldar cuentas tome un minuto y no termine en discusión.',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'dividir-gastos-de-viaje',
      title: 'Dividir Gastos de Viaje',
      description: 'Mantén las cuentas del viaje claras sin usar una planilla.',
      firstParagraph:
        'En un viaje siempre hay alguien que paga los pasajes, otra persona que reserva la casa y una tercera que va cubriendo taxis y cenas. Intentar reconstruir todo la última noche es como se arruinan los buenos viajes.',
      secondParagraph:
        'Carga cada gasto en el momento y comparte el link del grupo para que cada uno sume los suyos. Splitify mantiene el balance actualizado y, al terminar el viaje, te da una lista corta de pagos que deja todo saldado.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'dividir-la-cuenta-del-restaurante',
      title: 'Dividir la Cuenta del Restaurante',
      description: 'Divide la cuenta de forma justa aunque cada uno haya pedido distinto.',
      firstParagraph:
        'Llega la cuenta, una sola tarjeta paga todo y ahí empiezan las cuentas. Dividir en partes iguales es fácil, pero rara vez es justo cuando alguien pidió entrada y dos tragos y otra persona solo una ensalada.',
      secondParagraph:
        'Ingresa lo que gastó cada uno, o comparte un gasto puntual solo entre quienes lo consumieron. Splitify redondea hasta el centavo y te dice exactamente quién le debe a quien puso la tarjeta.',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'quien-le-debe-a-quien',
      title: 'Quién le Debe a Quién',
      description: 'Convierte una lista desordenada de pagos en las mínimas transferencias.',
      firstParagraph:
        'Cuando varias personas pagaron cosas distintas, sacar el balance final a mano es lento y fácil de equivocar. La mayoría de los grupos termina haciendo muchas más transferencias de las necesarias.',
      secondParagraph:
        'Splitify calcula la posición neta de cada persona y después busca la forma más corta de saldarla. En vez de seis pagos dando vueltas, quizás alcancen dos. Sin cuenta, sin registro, solo el resultado.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'dividir-gastos-entre-algunos',
      title: 'Dividir Gastos entre Algunos',
      description: 'Comparte un gasto solo entre las personas que corresponde.',
      firstParagraph:
        'No todos los gastos son de todos. Tres compartieron el taxi mientras el resto caminó, dos se quedaron con la habitación del balcón, una persona no tomó alcohol. Dividir todo en partes iguales termina cobrándole de más a alguien.',
      secondParagraph:
        'Carga el gasto y después elige exactamente con quién se comparte. El resto se sigue dividiendo entre todo el grupo como siempre, y el balance final contempla las dos cosas. Nadie discute por el taxi ni tiene que llevar la cuenta aparte.',
    },
  ],
  'pt-BR': [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'dividir-despesas-com-amigos',
      title: 'Dividir Despesas com Amigos',
      description: 'Divida despesas de forma justa com nossa ferramenta online.',
      firstParagraph:
        'Uma pessoa paga, depois outra cobre a próxima rodada, e uma terceira assume o táxi. No fim ninguém sabe direito quem está no positivo e quem está no negativo, e o grupo vira um monte de print de bloco de notas.',
      secondParagraph:
        'Digite cada nome e quanto a pessoa pagou. É só isso. O Splitify calcula o saldo até o centavo e mostra o menor número de pagamentos que zera tudo, seja um jantar, uma viagem ou o aluguel.',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'dividir-aluguel-entre-colegas',
      title: 'Dividir Aluguel entre Colegas',
      description: 'Calcule quem paga o quê do aluguel, das contas e dos gastos comuns.',
      firstParagraph:
        'Dividir apartamento é bem mais do que rachar o aluguel no meio. As contas chegam em datas diferentes, uma pessoa paga a internet, outra compra tudo para a cozinha, e no fim do mês ninguém lembra quem pagou o quê.',
      secondParagraph:
        'Registre cada gasto compartilhado na hora e deixe o Splitify calcular o saldo. Você vê exatamente quem deve para quem e quanto, com o menor número possível de transferências, para acertar as contas em um minuto sem virar discussão.',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'dividir-despesas-de-viagem',
      title: 'Dividir Despesas de Viagem',
      description: 'Mantenha as contas da viagem claras sem planilha nenhuma.',
      firstParagraph:
        'Em uma viagem sempre tem alguém que paga as passagens, outra pessoa que reserva a casa e uma terceira que vai cobrindo táxis e jantares. Tentar reconstruir tudo na última noite é como boas viagens terminam mal.',
      secondParagraph:
        'Registre cada despesa enquanto ela está fresca e compartilhe o link do grupo para todos somarem as suas. O Splitify mantém o saldo atualizado e, no fim da viagem, entrega uma lista curta de pagamentos que zera tudo.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'dividir-a-conta-do-restaurante',
      title: 'Dividir a Conta do Restaurante',
      description: 'Divida a conta de forma justa mesmo com pedidos diferentes.',
      firstParagraph:
        'A conta chega, um cartão paga tudo e aí começa a matemática. Dividir igualmente é fácil, mas raramente é justo quando uma pessoa pediu entrada e dois drinques e outra pediu só uma salada.',
      secondParagraph:
        'Informe quanto cada um gastou, ou compartilhe um item específico apenas entre quem consumiu. O Splitify arredonda até o centavo e diz exatamente quem deve para quem passou o cartão.',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'quem-deve-para-quem',
      title: 'Quem Deve para Quem',
      description: 'Transforme uma lista bagunçada de pagamentos nas menores transferências.',
      firstParagraph:
        'Quando várias pessoas pagaram coisas diferentes, fechar o saldo final na mão é lento e fácil de errar. A maioria dos grupos acaba fazendo muito mais transferências do que precisa.',
      secondParagraph:
        'O Splitify calcula a posição líquida de cada pessoa e depois encontra o caminho mais curto para zerar tudo. Em vez de seis pagamentos girando em círculo, talvez bastem dois. Sem conta, sem cadastro, só o resultado.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'dividir-despesas-entre-alguns',
      title: 'Dividir Despesas entre Alguns',
      description: 'Compartilhe um gasto só entre quem realmente participou.',
      firstParagraph:
        'Nem toda despesa é de todo mundo. Três dividiram o táxi enquanto o resto foi a pé, duas pessoas ficaram com o quarto da varanda, uma não bebeu. Dividir tudo por igual sempre acaba cobrando a mais de alguém.',
      secondParagraph:
        'Registre a despesa e escolha exatamente com quem ela é dividida. O resto continua rateado entre o grupo todo, e o saldo final considera as duas coisas. Ninguém precisa discutir o táxi nem manter uma conta paralela.',
    },
  ],
  'pt-PT': [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'dividir-despesas-com-amigos',
      title: 'Dividir Despesas com Amigos',
      description: 'Divida despesas de forma justa com a nossa ferramenta online.',
      firstParagraph:
        'Uma pessoa paga, depois outra cobre a rodada seguinte, e uma terceira trata do táxi. No fim ninguém sabe bem quem está a favor e quem está contra, e o grupo enche-se de capturas de ecrã de uma nota do telemóvel.',
      secondParagraph:
        'Escreva cada nome e quanto pagou. É só isso. O Splitify calcula o saldo ao cêntimo e mostra o menor número de pagamentos que resolve tudo, seja um jantar, uma viagem ou a renda.',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'dividir-a-renda-entre-colegas',
      title: 'Dividir a Renda entre Colegas',
      description: 'Calcule quem paga o quê da renda, das contas e dos gastos comuns.',
      firstParagraph:
        'Partilhar casa é bem mais do que dividir a renda ao meio. As contas chegam em datas diferentes, uma pessoa paga a internet, outra compra tudo para a cozinha, e ao fim do mês ninguém se lembra de quem pagou o quê.',
      secondParagraph:
        'Registe cada despesa partilhada na hora e deixe o Splitify calcular o saldo. Vê exatamente quem deve a quem e quanto, com o menor número possível de transferências, para acertar contas num minuto sem discussões.',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'dividir-despesas-de-viagem',
      title: 'Dividir Despesas de Viagem',
      description: 'Mantenha as contas da viagem claras sem nenhuma folha de cálculo.',
      firstParagraph:
        'Numa viagem há sempre alguém que paga as passagens, outra pessoa que reserva a casa e uma terceira que vai cobrindo táxis e jantares. Tentar reconstruir tudo na última noite é como as boas viagens acabam mal.',
      secondParagraph:
        'Registe cada despesa enquanto está fresca e partilhe a ligação do grupo para todos somarem as suas. O Splitify mantém o saldo atualizado e, no fim da viagem, entrega uma lista curta de pagamentos que fecha tudo.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'dividir-a-conta-do-restaurante',
      title: 'Dividir a Conta do Restaurante',
      description: 'Divida a conta de forma justa mesmo com pedidos diferentes.',
      firstParagraph:
        'Chega a conta, um cartão paga tudo e aí começa a matemática. Dividir por igual é fácil, mas raramente é justo quando uma pessoa pediu entrada e dois copos e outra pediu só uma salada.',
      secondParagraph:
        'Indique quanto cada um gastou, ou partilhe um item específico apenas entre quem o consumiu. O Splitify arredonda ao cêntimo e diz exatamente quem deve a quem passou o cartão.',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'quem-deve-a-quem',
      title: 'Quem Deve a Quem',
      description: 'Transforme uma lista confusa de pagamentos nas menores transferências.',
      firstParagraph:
        'Quando várias pessoas pagaram coisas diferentes, fechar o saldo à mão é lento e fácil de errar. A maioria dos grupos acaba a fazer muito mais transferências do que precisa.',
      secondParagraph:
        'O Splitify calcula a posição líquida de cada pessoa e depois encontra o caminho mais curto para a resolver. Em vez de seis pagamentos a andar em círculo, talvez bastem dois. Sem conta, sem registo, só o resultado.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'dividir-despesas-entre-alguns',
      title: 'Dividir Despesas entre Alguns',
      description: 'Partilhe um gasto só entre quem realmente participou.',
      firstParagraph:
        'Nem todas as despesas são de toda a gente. Três dividiram o táxi enquanto os outros foram a pé, duas pessoas ficaram com o quarto da varanda, uma não bebeu. Dividir tudo por igual acaba sempre por cobrar a mais a alguém.',
      secondParagraph:
        'Registe a despesa e escolha exatamente com quem é dividida. O resto continua repartido por todo o grupo, e o saldo final considera as duas coisas. Ninguém tem de discutir o táxi nem manter contas paralelas.',
    },
  ],
  fr: [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'partager-les-depenses-entre-amis',
      title: 'Partager les Dépenses entre Amis',
      description: 'Répartissez les dépenses équitablement avec notre outil en ligne.',
      firstParagraph:
        "Une personne paie, une autre prend la tournée suivante, une troisième s'occupe du taxi. À la fin, plus personne ne sait qui est créditeur et qui est débiteur, et la conversation se remplit de captures d'écran d'une note de téléphone.",
      secondParagraph:
        "Entrez chaque prénom et le montant payé. C'est tout. Splitify calcule le solde au centime près et vous donne le plus petit nombre de virements qui règle tout, que ce soit un dîner, un voyage ou le loyer.",
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'partager-le-loyer-entre-colocataires',
      title: 'Partager le Loyer entre Colocataires',
      description: 'Calculez qui paie quoi pour le loyer, les factures et les frais communs.',
      firstParagraph:
        "Vivre en colocation, ce n'est pas seulement couper le loyer en deux. Les factures arrivent à des dates différentes, une personne paie internet, une autre achète tout pour la cuisine, et en fin de mois plus personne ne se souvient de qui a payé quoi.",
      secondParagraph:
        "Notez chaque dépense commune au moment où elle arrive et laissez Splitify calculer le solde. Vous voyez exactement qui doit quoi à qui, avec le moins de virements possible, pour régler les comptes en une minute au lieu d'une dispute.",
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'partager-les-depenses-de-voyage',
      title: 'Partager les Dépenses de Voyage',
      description: 'Gardez des comptes clairs en voyage, sans tableur.',
      firstParagraph:
        "En voyage, quelqu'un paie toujours les billets, une autre personne réserve la maison, et une troisième enchaîne les taxis et les dîners. Essayer de tout reconstituer le dernier soir, c'est comme ça que les bons voyages finissent mal.",
      secondParagraph:
        'Notez chaque dépense sur le moment et partagez le lien du groupe pour que chacun ajoute les siennes. Splitify tient le solde à jour et, à la fin du voyage, vous donne une courte liste de virements qui solde tout.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'partager-addition-restaurant',
      title: 'Partager une Addition au Restaurant',
      description: "Partagez l'addition équitablement, même avec des commandes différentes.",
      firstParagraph:
        "L'addition arrive, une seule carte paie tout, et les calculs commencent. Diviser en parts égales est simple mais rarement juste quand une personne a pris une entrée et deux verres et une autre juste une salade.",
      secondParagraph:
        "Indiquez ce que chacun a réellement dépensé, ou partagez un plat uniquement entre ceux qui l'ont pris. Splitify arrondit au centime et vous dit exactement qui doit combien à la personne qui a payé.",
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'qui-doit-quoi-a-qui',
      title: 'Qui Doit Quoi à Qui',
      description: 'Transformez une liste de paiements confuse en un minimum de virements.',
      firstParagraph:
        'Quand plusieurs personnes ont payé des choses différentes, faire le solde à la main est lent et facile à rater. La plupart des groupes finissent par faire bien plus de virements que nécessaire.',
      secondParagraph:
        'Splitify calcule la position nette de chacun puis trouve le chemin le plus court pour tout solder. Au lieu de six paiements qui tournent en rond, deux suffisent peut-être. Sans compte, sans inscription, juste le résultat.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'partager-une-depense-entre-certains',
      title: 'Partager une Dépense entre Certains',
      description: 'Partagez un frais uniquement entre les personnes concernées.',
      firstParagraph:
        "Toutes les dépenses ne concernent pas tout le monde. Trois personnes ont partagé le taxi pendant que les autres marchaient, deux ont pris la chambre avec balcon, une n'a pas bu. Tout diviser également fait toujours payer trop à quelqu'un.",
      secondParagraph:
        "Ajoutez la dépense, puis choisissez exactement avec qui elle est partagée. Le reste continue d'être réparti sur tout le groupe, et le solde final tient compte des deux. Personne n'a à discuter du taxi ni à tenir ses propres comptes.",
    },
  ],
  de: [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'ausgaben-mit-freunden-teilen',
      title: 'Ausgaben mit Freunden Teilen',
      description: 'Teile Ausgaben fair mit unserem Online-Rechner.',
      firstParagraph:
        'Einer zahlt, dann übernimmt jemand anders die nächste Runde, und eine dritte Person kümmert sich um das Taxi. Am Ende weiß niemand mehr genau, wer im Plus und wer im Minus ist, und der Gruppenchat füllt sich mit Screenshots aus einer Notiz-App.',
      secondParagraph:
        'Trag einfach jeden Namen und den gezahlten Betrag ein. Mehr braucht es nicht. Splitify berechnet den Saldo auf den Cent genau und nennt dir die kürzeste Reihe von Zahlungen, die alles ausgleicht — ob Abendessen, Urlaub oder Miete.',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'miete-mit-mitbewohnern-teilen',
      title: 'Miete mit Mitbewohnern Teilen',
      description: 'Berechne, wer was für Miete, Nebenkosten und gemeinsame Ausgaben zahlt.',
      firstParagraph:
        'Eine WG bedeutet mehr, als die Miete durch zwei zu teilen. Rechnungen kommen zu unterschiedlichen Zeiten, eine Person zahlt das Internet, eine andere kauft alles für die Küche, und am Monatsende weiß niemand mehr, wer was bezahlt hat.',
      secondParagraph:
        'Trag jede gemeinsame Ausgabe direkt ein und lass Splitify den Saldo berechnen. Du siehst genau, wer wem wie viel schuldet, mit so wenigen Überweisungen wie möglich — abrechnen dauert eine Minute statt in Streit zu enden.',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'reisekosten-teilen',
      title: 'Reisekosten Teilen',
      description: 'Behalte die Urlaubskasse im Blick, ganz ohne Tabelle.',
      firstParagraph:
        'Auf einer Reise zahlt immer jemand die Flüge, jemand anders bucht das Haus, und eine dritte Person übernimmt Taxis und Abendessen. Am letzten Abend alles rekonstruieren zu wollen, ist der Grund, warum gute Reisen schlecht enden.',
      secondParagraph:
        'Trag jede Ausgabe ein, solange sie frisch ist, und teile den Gruppenlink, damit alle ihre eigenen ergänzen. Splitify hält den Saldo aktuell und liefert am Ende der Reise eine kurze Liste von Zahlungen, die alles ausgleicht.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'restaurantrechnung-teilen',
      title: 'Restaurantrechnung Teilen',
      description: 'Teile die Rechnung fair, auch wenn alle etwas anderes bestellt haben.',
      firstParagraph:
        'Die Rechnung kommt, eine Karte zahlt alles, und dann beginnt das Rechnen. Gleichmäßig zu teilen ist einfach, aber selten fair, wenn eine Person Vorspeise und zwei Getränke hatte und eine andere nur einen Salat.',
      secondParagraph:
        'Gib ein, was jede Person tatsächlich ausgegeben hat, oder teile einen einzelnen Posten nur unter denen, die ihn hatten. Splitify rundet auf den Cent und sagt dir genau, wer der zahlenden Person wie viel schuldet.',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'wer-schuldet-wem',
      title: 'Wer Schuldet Wem',
      description: 'Mach aus einer unübersichtlichen Zahlungsliste möglichst wenige Überweisungen.',
      firstParagraph:
        'Wenn mehrere Leute verschiedene Dinge bezahlt haben, ist der Saldo von Hand langsam und fehleranfällig. Die meisten Gruppen überweisen am Ende deutlich öfter als nötig.',
      secondParagraph:
        'Splitify berechnet die Nettoposition aller Beteiligten und findet dann den kürzesten Weg zum Ausgleich. Statt sechs Zahlungen im Kreis reichen vielleicht zwei. Kein Konto, keine Anmeldung, nur das Ergebnis.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'ausgabe-nur-mit-einigen-teilen',
      title: 'Ausgabe nur mit Einigen Teilen',
      description: 'Teile eine Ausgabe nur mit den Personen, die sie betrifft.',
      firstParagraph:
        'Nicht jede Ausgabe betrifft alle. Drei haben sich ein Taxi geteilt, während der Rest gelaufen ist, zwei hatten das Zimmer mit Balkon, eine Person hat nicht getrunken. Alles gleichmäßig zu teilen belastet jedes Mal still jemanden zu viel.',
      secondParagraph:
        'Trag die Ausgabe ein und wähle genau, mit wem sie geteilt wird. Alles andere bleibt wie gewohnt auf die Gruppe verteilt, und der Endsaldo berücksichtigt beides. Niemand muss über das Taxi diskutieren oder heimlich mitrechnen.',
    },
  ],
  id: [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'bagi-pengeluaran-dengan-teman',
      title: 'Bagi Pengeluaran dengan Teman',
      description: 'Bagi pengeluaran secara adil dengan alat online kami.',
      firstParagraph:
        'Satu orang membayar, lalu yang lain menanggung ronde berikutnya, dan orang ketiga mengurus taksi. Pada akhirnya tidak ada yang tahu pasti siapa yang lebih dan siapa yang kurang, dan grup chat penuh tangkapan layar dari aplikasi catatan.',
      secondParagraph:
        'Cukup masukkan setiap nama dan berapa yang dibayar. Hanya itu. Splitify menghitung saldo sampai satuan terkecil dan memberi tahu rangkaian pembayaran terpendek yang menyelesaikannya, baik untuk makan malam, liburan, atau sewa.',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'bagi-sewa-dengan-teman-sekamar',
      title: 'Bagi Sewa dengan Teman Sekamar',
      description: 'Hitung siapa membayar apa untuk sewa, tagihan, dan pengeluaran bersama.',
      firstParagraph:
        'Berbagi tempat tinggal bukan sekadar membagi sewa dua. Tagihan datang di waktu berbeda, satu orang membayar internet, yang lain membeli semua keperluan dapur, dan di akhir bulan tidak ada yang ingat siapa membayar apa.',
      secondParagraph:
        'Catat setiap pengeluaran bersama begitu terjadi dan biarkan Splitify menghitung saldonya. Kamu tahu persis siapa berutang kepada siapa dan berapa, dengan transfer sesedikit mungkin, jadi menyelesaikannya butuh satu menit, bukan perdebatan.',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'bagi-biaya-perjalanan',
      title: 'Bagi Biaya Perjalanan',
      description: 'Jaga catatan biaya liburan tetap jelas tanpa spreadsheet.',
      firstParagraph:
        'Dalam perjalanan selalu ada yang membayar tiket, orang lain memesan penginapan, dan orang ketiga terus menanggung taksi dan makan malam. Mencoba mengingat semuanya di malam terakhir adalah cara liburan bagus berakhir buruk.',
      secondParagraph:
        'Catat setiap pengeluaran selagi masih segar dan bagikan tautan grup agar semua bisa menambahkan miliknya. Splitify menjaga saldo tetap terbarui, dan saat perjalanan selesai kamu mendapat daftar pembayaran singkat yang melunasi semuanya.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'bagi-tagihan-restoran',
      title: 'Bagi Tagihan Restoran',
      description: 'Bagi tagihan dengan adil meski pesanan setiap orang berbeda.',
      firstParagraph:
        'Tagihan datang, satu kartu membayar semuanya, lalu perhitungan dimulai. Membagi rata itu mudah tetapi jarang adil ketika satu orang memesan pembuka dan dua minuman sementara yang lain hanya salad.',
      secondParagraph:
        'Masukkan berapa yang benar-benar dihabiskan setiap orang, atau bagikan satu item hanya kepada mereka yang memesannya. Splitify membulatkan sampai satuan terkecil dan memberi tahu persis siapa berutang kepada yang membayar.',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'siapa-berutang-kepada-siapa',
      title: 'Siapa Berutang kepada Siapa',
      description: 'Ubah daftar pembayaran yang berantakan menjadi transfer paling sedikit.',
      firstParagraph:
        'Ketika beberapa orang membayar hal yang berbeda, menghitung saldo akhir secara manual itu lambat dan mudah salah. Kebanyakan grup akhirnya melakukan jauh lebih banyak transfer daripada yang dibutuhkan.',
      secondParagraph:
        'Splitify menghitung posisi bersih setiap orang lalu mencari cara terpendek untuk melunasinya. Alih-alih enam pembayaran berputar-putar, mungkin dua saja cukup. Tanpa akun, tanpa pendaftaran, hanya hasilnya.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'bagi-pengeluaran-dengan-sebagian',
      title: 'Bagi Pengeluaran dengan Sebagian',
      description: 'Bagikan satu biaya hanya kepada orang yang terkait.',
      firstParagraph:
        'Tidak semua pengeluaran milik semua orang. Tiga orang berbagi taksi sementara sisanya berjalan kaki, dua orang mengambil kamar dengan balkon, satu orang tidak minum. Membagi semuanya rata diam-diam selalu membebani seseorang.',
      secondParagraph:
        'Tambahkan pengeluarannya, lalu pilih persis dengan siapa itu dibagi. Sisanya tetap dibagi ke seluruh grup seperti biasa, dan saldo akhir memperhitungkan keduanya. Tidak perlu berdebat soal taksi atau menyimpan catatan sendiri.',
    },
  ],
  ru: [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'razdelit-raskhody-s-druzyami',
      title: 'Разделить Расходы с Друзьями',
      description: 'Справедливо делите расходы с помощью нашего онлайн-инструмента.',
      firstParagraph:
        'Один платит, потом кто-то берёт следующий заказ, а третий оплачивает такси. В итоге никто толком не понимает, кто в плюсе, а кто в минусе, и чат заполняется скриншотами из заметок.',
      secondParagraph:
        'Просто введите имя каждого и сколько он заплатил. Это всё. Splitify посчитает баланс до копейки и подскажет минимальное число переводов, которое всё закроет — будь то ужин, поездка или аренда.',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'razdelit-arendu-s-sosedyami',
      title: 'Разделить Аренду с Соседями',
      description: 'Посчитайте, кто сколько платит за аренду, счета и общие расходы.',
      firstParagraph:
        'Снимать квартиру вместе — это не только разделить аренду пополам. Счета приходят в разное время, один платит за интернет, другой покупает всё для кухни, и к концу месяца никто не помнит, кто за что платил.',
      secondParagraph:
        'Записывайте каждый общий расход сразу, а Splitify посчитает баланс. Вы увидите, кто кому и сколько должен, с минимальным числом переводов — расчёт займёт минуту вместо спора.',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'razdelit-raskhody-v-poezdke',
      title: 'Разделить Расходы в Поездке',
      description: 'Держите отпускные траты под контролем без таблиц.',
      firstParagraph:
        'В поездке кто-то всегда платит за билеты, кто-то бронирует жильё, а третий оплачивает такси и ужины. Попытка восстановить всё это в последний вечер — вот как хорошие поездки заканчиваются плохо.',
      secondParagraph:
        'Записывайте расходы по горячим следам и поделитесь ссылкой на группу, чтобы каждый добавлял свои. Splitify обновляет баланс, а в конце поездки выдаёт короткий список переводов, который всё закрывает.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'razdelit-schet-v-restorane',
      title: 'Разделить Счёт в Ресторане',
      description: 'Разделите счёт честно, даже если все заказывали разное.',
      firstParagraph:
        'Приносят счёт, одна карта оплачивает всё, и начинается математика. Делить поровну просто, но редко справедливо, когда один взял закуску и два напитка, а другой — только салат.',
      secondParagraph:
        'Укажите, сколько потратил каждый, или разделите одну позицию только между теми, кто её брал. Splitify округляет до копейки и точно скажет, кто и сколько должен тому, кто платил.',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'kto-komu-dolzhen',
      title: 'Кто Кому Должен',
      description: 'Превратите путаный список платежей в минимум переводов.',
      firstParagraph:
        'Когда несколько человек платили за разное, свести баланс вручную долго и легко ошибиться. Большинство групп в итоге делает намного больше переводов, чем нужно.',
      secondParagraph:
        'Splitify считает итоговую позицию каждого, а затем находит кратчайший путь к расчёту. Вместо шести платежей по кругу может хватить двух. Без аккаунта, без регистрации — только результат.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'razdelit-raskhod-mezhdu-nekotorymi',
      title: 'Разделить Расход между Некоторыми',
      description: 'Разделите трату только между теми, кого она касается.',
      firstParagraph:
        'Не каждый расход общий. Трое поехали на такси, пока остальные шли пешком, двое заняли комнату с балконом, кто-то не пил. Делить всё поровну каждый раз тихо переплачивает за кого-то.',
      secondParagraph:
        'Добавьте расход и выберите, с кем именно он делится. Всё остальное продолжает делиться на всю группу, а итоговый баланс учитывает и то, и другое. Никому не нужно спорить про такси или вести свой отдельный счёт.',
    },
  ],
  ja: [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'warikan-keisan',
      title: '友達と割り勘する',
      description: 'オンラインツールで支払いを公平に分けましょう。',
      firstParagraph:
        '誰かが払い、次は別の人が出し、三人目がタクシー代を持つ。気づけば誰がプラスで誰がマイナスなのか分からなくなり、グループはメモアプリのスクリーンショットで埋まります。',
      secondParagraph:
        '名前と支払った金額を入れるだけ。あとは Splitify が一円単位で残高を計算し、精算に必要な最小限の送金を教えてくれます。食事でも旅行でも家賃でも同じです。',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'yachin-warikan',
      title: 'ルームメイトと家賃を分ける',
      description: '家賃・光熱費・共同の出費を誰がいくら払うか計算します。',
      firstParagraph:
        'ルームシェアは家賃を半分にするだけではありません。請求書の届く時期はばらばらで、ある人がネット代を払い、別の人がキッチンの物を買い、月末には誰が何を払ったのか誰も覚えていません。',
      secondParagraph:
        '共同の出費はその場で記録し、残高の計算は Splitify に任せましょう。誰が誰にいくら払えばよいかが、できるだけ少ない送金回数で分かります。精算は口論ではなく一分で終わります。',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'ryoko-hiyo-warikan',
      title: '旅行の費用を分ける',
      description: '表計算なしで旅の会計をすっきり保ちます。',
      firstParagraph:
        '旅行では必ず誰かが航空券を払い、別の誰かが宿を予約し、三人目がタクシーや夕食を立て替え続けます。最終日の夜に全部を思い出そうとするのは、良い旅が台無しになる典型です。',
      secondParagraph:
        '記憶が新しいうちに記録し、グループのリンクを共有すれば全員が自分の分を追加できます。Splitify が残高を更新し続け、旅の終わりにはすべてを清算する短い送金リストが手に入ります。',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'restoran-warikan',
      title: 'レストランの会計を分ける',
      description: '注文が違っても公平に会計を分けられます。',
      firstParagraph:
        '伝票が来て、一枚のカードが全額を払い、そこから計算が始まります。均等割りは簡単ですが、前菜とドリンク二杯の人とサラダだけの人がいるときに公平とは言えません。',
      secondParagraph:
        '各自が実際に使った金額を入力するか、その品を頼んだ人だけで分けましょう。Splitify は一円単位で丸め、支払った人に誰がいくら返せばよいかを正確に示します。',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'dare-ga-dare-ni',
      title: '誰が誰にいくら払うか',
      description: 'ばらばらの支払い履歴を最小限の送金に変えます。',
      firstParagraph:
        '複数の人が別々のものを払っていると、最終的な残高を手計算するのは遅く、間違えやすくなります。多くのグループは必要以上に送金を繰り返しています。',
      secondParagraph:
        'Splitify は全員の差引残高を計算し、それを解消する最短の方法を見つけます。六回の送金が堂々巡りする代わりに、二回で済むかもしれません。アカウントも登録も不要、結果だけです。',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'ichibu-no-hito-de-warikan',
      title: '一部の人だけで分ける',
      description: 'その費用に関係する人だけで分担できます。',
      firstParagraph:
        'すべての出費が全員のものとは限りません。三人がタクシーに乗り、残りは歩いた。二人がバルコニー付きの部屋に泊まった。一人はお酒を飲まなかった。全部を均等に割ると、毎回誰かが静かに多く払うことになります。',
      secondParagraph:
        '出費を追加したら、誰と分けるかを正確に選びます。ほかの費用はこれまで通りグループ全員で分けられ、最終的な残高は両方を反映します。タクシー代でもめる必要も、自分だけの計算を抱える必要もありません。',
    },
  ],
  'zh-CN': [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'haoyou-fentan',
      title: '和朋友分摊费用',
      description: '用我们的在线工具公平地分摊开销。',
      firstParagraph:
        '一个人先付，接着另一个人买单，第三个人又包了打车。到最后谁多付了、谁少付了没人说得清，群里全是记事本的截图。',
      secondParagraph:
        '只要输入每个人的名字和付的金额就行。Splitify 会精确到分算出余额，并给出结清所需的最少转账次数，聚餐、旅行还是房租都一样。',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'fangzu-fentan',
      title: '和室友分摊房租',
      description: '算清房租、账单和共同开销各付多少。',
      firstParagraph:
        '合租远不只是把房租对半分。账单到期时间不同，一个人交网费，另一个人买齐厨房用品，到了月底谁也记不清谁付过什么。',
      secondParagraph:
        '每笔共同支出随手记下，余额交给 Splitify 计算。谁欠谁多少一目了然，而且转账次数尽可能少，结账只需一分钟，不用吵架。',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'lvxing-feiyong-fentan',
      title: '分摊旅行费用',
      description: '不用表格也能把旅行账目理清楚。',
      firstParagraph:
        '旅行时总有人付机票，另一个人订房子，还有人一路垫付打车和晚餐。最后一晚才想把这些理清楚，正是好旅行变糟的原因。',
      secondParagraph:
        '趁记忆还新鲜就记下每笔支出，把群组链接分享出去，让大家各自补充。Splitify 实时更新余额，旅行结束时给你一份简短的转账清单，一次结清。',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'canting-maidan-fentan',
      title: '分摊餐厅账单',
      description: '即使点的东西不同，也能公平分账。',
      firstParagraph:
        '账单送来，一张卡付了全部，然后开始算数。平均分很简单，但当有人点了前菜加两杯酒、有人只吃了沙拉时，就很难说公平。',
      secondParagraph:
        '输入每个人实际花了多少，或者把某一道菜只分给点它的人。Splitify 精确到分，并准确告诉你谁该还给买单的人多少。',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'shui-qian-shui',
      title: '谁欠谁多少',
      description: '把一团乱的付款记录变成最少的转账。',
      firstParagraph:
        '当好几个人分别付了不同的东西，手工算最终余额既慢又容易出错。大多数群组最后转账的次数远超实际所需。',
      secondParagraph:
        'Splitify 先算出每个人的净额，再找出结清的最短路径。原本要绕六次的付款，也许两次就够了。无需账号，无需注册，只有结果。',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'bufen-ren-fentan',
      title: '只和部分人分摊',
      description: '把某笔开销只分给相关的人。',
      firstParagraph:
        '并不是每笔开销都属于所有人。三个人一起打了车，其他人走路；两个人住了带阳台的房间；有人没喝酒。全部平均分摊，每次都会悄悄让某个人多付。',
      secondParagraph:
        '添加这笔支出，然后精确选择和谁分摊。其余费用照常由整个群组分担，最终余额会同时考虑两者。没人需要为打车费争论，也不用自己另记一本账。',
    },
  ],
  'zh-TW': [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'haoyou-fentan',
      title: '和朋友分攤費用',
      description: '用我們的線上工具公平地分攤開銷。',
      firstParagraph:
        '一個人先付，接著另一個人買單，第三個人又包了計程車。到最後誰多付了、誰少付了沒人說得清，群組裡全是記事本的截圖。',
      secondParagraph:
        '只要輸入每個人的名字和付的金額就行。Splitify 會精確到分算出餘額，並給出結清所需的最少轉帳次數，聚餐、旅行還是房租都一樣。',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'fangzu-fentan',
      title: '和室友分攤房租',
      description: '算清房租、帳單和共同開銷各付多少。',
      firstParagraph:
        '合租遠不只是把房租對半分。帳單到期時間不同，一個人繳網路費，另一個人買齊廚房用品，到了月底誰也記不清誰付過什麼。',
      secondParagraph:
        '每筆共同支出隨手記下，餘額交給 Splitify 計算。誰欠誰多少一目了然，而且轉帳次數盡可能少，結帳只需一分鐘，不用吵架。',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'lvxing-feiyong-fentan',
      title: '分攤旅行費用',
      description: '不用試算表也能把旅行帳目理清楚。',
      firstParagraph:
        '旅行時總有人付機票，另一個人訂房子，還有人一路墊付計程車和晚餐。最後一晚才想把這些理清楚，正是好旅行變糟的原因。',
      secondParagraph:
        '趁記憶還新鮮就記下每筆支出，把群組連結分享出去，讓大家各自補充。Splitify 即時更新餘額，旅行結束時給你一份簡短的轉帳清單，一次結清。',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'canting-maidan-fentan',
      title: '分攤餐廳帳單',
      description: '即使點的東西不同，也能公平分帳。',
      firstParagraph:
        '帳單送來，一張卡付了全部，然後開始算數。平均分很簡單，但當有人點了前菜加兩杯酒、有人只吃了沙拉時，就很難說公平。',
      secondParagraph:
        '輸入每個人實際花了多少，或者把某一道菜只分給點它的人。Splitify 精確到分，並準確告訴你誰該還給買單的人多少。',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'shui-qian-shui',
      title: '誰欠誰多少',
      description: '把一團亂的付款紀錄變成最少的轉帳。',
      firstParagraph:
        '當好幾個人分別付了不同的東西，手動算最終餘額既慢又容易出錯。大多數群組最後轉帳的次數遠超實際所需。',
      secondParagraph:
        'Splitify 先算出每個人的淨額，再找出結清的最短路徑。原本要繞六次的付款，也許兩次就夠了。無需帳號，無需註冊，只有結果。',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'bufen-ren-fentan',
      title: '只和部分人分攤',
      description: '把某筆開銷只分給相關的人。',
      firstParagraph:
        '並不是每筆開銷都屬於所有人。三個人一起搭了車，其他人走路；兩個人住了有陽台的房間；有人沒喝酒。全部平均分攤，每次都會悄悄讓某個人多付。',
      secondParagraph:
        '新增這筆支出，然後精確選擇和誰分攤。其餘費用照常由整個群組分擔，最終餘額會同時考慮兩者。沒人需要為車資爭論，也不用自己另記一本帳。',
    },
  ],
  ar: [
    {
      key: 'split-bill',
      cta: 'quick',
      slug: 'taqsim-almasarif-maa-alasdiqa',
      title: 'تقسيم المصاريف مع الأصدقاء',
      description: 'قسّم المصاريف بعدل باستخدام أداتنا على الإنترنت.',
      firstParagraph:
        'شخص يدفع، ثم يتكفّل آخر بالجولة التالية، ويتولى ثالث أجرة التاكسي. وفي النهاية لا أحد يعرف بالضبط من له ومن عليه، وتمتلئ المحادثة بلقطات شاشة من تطبيق الملاحظات.',
      secondParagraph:
        'اكتب اسم كل شخص والمبلغ الذي دفعه. هذا كل شيء. يحسب Splitify الرصيد حتى أصغر وحدة ويخبرك بأقل عدد من التحويلات يُنهي الحساب، سواء كان عشاءً أو رحلة أو إيجارًا.',
    },
    {
      key: 'split-rent',
      cta: 'groups',
      slug: 'taqsim-alijar-maa-alsukan',
      title: 'تقسيم الإيجار مع شركاء السكن',
      description: 'احسب من يدفع ماذا من الإيجار والفواتير والمصاريف المشتركة.',
      firstParagraph:
        'مشاركة السكن أكثر من مجرد تقسيم الإيجار إلى نصفين. الفواتير تصل في أوقات مختلفة، وشخص يدفع الإنترنت، وآخر يشتري كل شيء للمطبخ، وفي نهاية الشهر لا أحد يتذكر من دفع ماذا.',
      secondParagraph:
        'سجّل كل مصروف مشترك فور حدوثه ودع Splitify يحسب الرصيد. سترى بالضبط من يدين لمن وبكم، بأقل عدد ممكن من التحويلات، فتنتهي التسوية في دقيقة بدل أن تتحول إلى خلاف.',
    },
    {
      key: 'group-trip',
      cta: 'groups',
      slug: 'taqsim-masarif-alrihla',
      title: 'تقسيم مصاريف الرحلة',
      description: 'حافظ على وضوح حسابات الرحلة دون أي جداول.',
      firstParagraph:
        'في أي رحلة هناك دائمًا من يدفع التذاكر، وآخر يحجز البيت، وثالث يتكفّل بسيارات الأجرة والعشاء. محاولة تجميع كل ذلك في الليلة الأخيرة هي سبب انتهاء الرحلات الجميلة نهاية سيئة.',
      secondParagraph:
        'سجّل كل مصروف وهو ما زال طازجًا وشارك رابط المجموعة ليضيف كل شخص مصاريفه. يبقي Splitify الرصيد محدثًا، وفي نهاية الرحلة يعطيك قائمة قصيرة من التحويلات تُنهي كل شيء.',
    },
    {
      key: 'restaurant-bill',
      cta: 'quick',
      slug: 'taqsim-fatura-almataam',
      title: 'تقسيم فاتورة المطعم',
      description: 'قسّم الفاتورة بعدل حتى لو اختلفت الطلبات.',
      firstParagraph:
        'تصل الفاتورة، وتدفعها بطاقة واحدة، ثم تبدأ الحسابات. التقسيم بالتساوي سهل لكنه نادرًا ما يكون عادلًا عندما يطلب أحدهم مقبلات ومشروبين ويكتفي آخر بسلطة.',
      secondParagraph:
        'أدخل ما أنفقه كل شخص فعليًا، أو شارك صنفًا واحدًا بين من طلبوه فقط. يقرّب Splitify حتى أصغر وحدة ويخبرك بالضبط بمن يدين لمن دفع.',
    },
    {
      key: 'who-owes-who',
      cta: 'quick',
      slug: 'man-yadin-liman',
      title: 'من يدين لمن',
      description: 'حوّل قائمة مدفوعات فوضوية إلى أقل عدد من التحويلات.',
      firstParagraph:
        'عندما يدفع عدة أشخاص أشياء مختلفة، يصبح حساب الرصيد النهائي يدويًا بطيئًا وسهل الخطأ. معظم المجموعات تنتهي بتحويلات أكثر بكثير مما تحتاج.',
      secondParagraph:
        'يحسب Splitify الوضع الصافي لكل شخص ثم يجد أقصر طريق لتسويته. بدل ستة مدفوعات تدور في حلقة، قد تكفي اثنتان. بلا حساب، بلا تسجيل، النتيجة فقط.',
    },
    {
      key: 'uneven-split',
      cta: 'groups',
      slug: 'taqsim-maa-baad-alashkhas',
      title: 'تقسيم مصروف مع بعض الأشخاص',
      description: 'شارك مصروفًا مع من يخصّهم فقط.',
      firstParagraph:
        'ليست كل المصاريف تخص الجميع. ثلاثة تشاركوا سيارة الأجرة بينما مشى الباقون، واثنان أخذا الغرفة ذات الشرفة، وواحد لم يشرب. تقسيم كل شيء بالتساوي يحمّل أحدهم أكثر مما يجب في كل مرة.',
      secondParagraph:
        'أضف المصروف ثم اختر بالضبط مع من يُقسَّم. يبقى الباقي موزعًا على المجموعة كالمعتاد، ويأخذ الرصيد النهائي الأمرين في الحسبان. لا داعي للجدال حول التاكسي ولا لحساب خاص جانبي.',
    },
  ],
}

export const getSeoRoute = (locale: string, slug: string) =>
  (SEO_ROUTES[locale] ?? []).find((route) => route.slug === slug)

/* The same note lives under a different slug in each language, so alternates have to be looked up by key */
export const getSeoRouteAlternates = (key: string) =>
  Object.entries(SEO_ROUTES).flatMap(([locale, routes]) => {
    const match = routes.find((route) => route.key === key)

    return match ? [{ locale, slug: match.slug }] : []
  })

/* A locale switch can land on a slug that only exists in another language.
   Looking it up by slug lets us send the reader to the same note in their own language */
export const findSeoRouteBySlug = (slug: string) => {
  for (const [locale, routes] of Object.entries(SEO_ROUTES)) {
    const route = routes.find((candidate) => candidate.slug === slug)

    if (route) return { locale, route }
  }

  return undefined
}

export const hasSeoRoutes = (locale: string) => (SEO_ROUTES[locale] ?? []).length > 0

export const SEO_LOCALES = Object.keys(SEO_ROUTES).filter(hasSeoRoutes)
