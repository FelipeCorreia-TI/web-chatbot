const WebSocket = require('ws');


const wss = new WebSocket.Server({ port: 8081 });

console.log('🚀 Servidor WebSocket rodando na porta 8081');


wss.on('connection', (ws) => {

    console.log('✅ Novo cliente conectado');

    // Avisa todos os clientes que alguém entrou
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send('🔵 Um novo usuário entrou no chat.');
        }
    });

    // Evento: quando o servidor recebe uma mensagem deste cliente
    ws.on('message', (data) => {
        const mensagem = data.toString();
        console.log('💬 Mensagem recebida:', mensagem);

        // Retransmite a mensagem para TODOS os clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(mensagem);
            }
        });
    });

    // Evento: quando este cliente se desconecta
    ws.on('close', () => {
        console.log('❌ Cliente desconectado');

        // Avisa todos os clientes que alguém saiu
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('🔴 Um usuário saiu do chat.');
            }
        });
    });

    // Evento: quando ocorre um erro na conexão
    ws.on('error', (erro) => {
        console.error('⚠️ Erro no WebSocket:', erro.message);
    });

});