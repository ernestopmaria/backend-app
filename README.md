# recuperação de senha

 **Requisitos funcionais** => RF
-O Usuario deve poder recuperar sua senha informando seu email.
-O usuario deve receber um email com instruções de recuperação de senha.
-O ususario deve poder resetar sua senha;


**Requisitos não funcionais** => RNF
-Utilizar Mailtrap para testar envios em ambientes de dev;
-Utilizar Amazon SES para envios em produção;
-O envio de email deve acontecer em segundo plano(background job)

**Regra de Negocios**  => RN
-O link do email enciado deve expirar em tempo x
-O usario precisa confirmar a nova senha ao resetar a sua senha



# Actualização do perfil
**RF**
o usuario de poder actualizar seu nome email e senha.

**RN**
- o usuario não pode alterar seu email para um email ja utilizado.
-Para atualizar sua senha, o usuario deve informar a senha antiga;
-para actualizar sua senha o usuario precisa confirmar a nova senha;


# Painel do prestador

**RF**
- O Usuario deve poder listar seus agendamentos de um dia especifico.
- O prestador deve receber uma notificação sempre que houver um novo agendamento.
- O prestador deve poder visualizar as notificações não lidas.

**RNF**

 -Os agendamentos do prestador no dia devem ser armazenados em cache;
 -As notificações do prestador devem ser armazenadas no MongoDB;
 -As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io


**RN**
- A notificação de ter um status de lida ou não lida para que o prestador possa controlar;





# Agendamento de serviços
**RF**
-O usuario deve poder listar todos os prestadores de serviço cadastrados;
-O ususario deve poder listar os dias de um mès com pelo menos um horario disponivel de um prestador
-o ususario deve poder listar hoarios disponiveis de um dia especifico de um prestador;
-o usuario deve poder realizar um novo agendamentos com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenado em cache;

**RN**
-Cada agendamento deve durar 1h exatamente;
-Os agendamentos devem estar disponiveis entre;  8hrs as 18hr(Primeiro ás 8h, ultimos as 17hrs);
- O Usuario não pode em um horario ja ocupado;
-O usuario não pode agendar em um horario que já passou;
-o Usuario não pode agendar serviço consigo mesmo
