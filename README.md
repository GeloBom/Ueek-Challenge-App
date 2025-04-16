# Ueek Challenge App

Este projeto foi desenvolvido utilizando [Angular CLI](https://github.com/angular/angular-cli) versão 19.2.5 e integra funcionalidades de manipulação de polígonos em um mapa global utilizando a biblioteca OpenLayers.

---

## 🖥️ Tecnologias Utilizadas

- **Angular 16+**: Framework para construção de aplicações web modernas.
- **OpenLayers**: Biblioteca para renderização e manipulação de mapas interativos.
- **Karma**: Ferramenta de testes para garantir a qualidade do código.
- **HTML e SCSS**: Para estruturação e estilização da interface.

---

## 🎯 Funcionalidades

1. **Renderização de Mapa Global**:
   - O mapa é renderizado utilizando a biblioteca OpenLayers.

2. **Inserção de Polígonos Aleatórios**:
   - Botão para adicionar de 1 a 4 polígonos aleatórios dentro da área de Lages - SC.

3. **Inserção de Polígonos Individuais com Zoom Automático**:
   - Botão para adicionar um único polígono e ajustar o zoom automaticamente para centralizá-lo.

4. **Zoom In e Zoom Out**:
   - Botões para ajustar o nível de zoom do mapa.

5. **Remoção de Polígonos**:
   - Botão para remover todos os polígonos do mapa.
   - Modo de remoção individual, onde é possível clicar em um polígono para removê-lo.

6. **Controle de Opacidade**:
   - Slider para ajustar a opacidade de todos os polígonos no mapa.

7. **Recoloração de Polígonos**:
   - Botão para aplicar cores aleatórias a todos os polígonos.

---

## 🚀 Como Rodar o Projeto

1. **Clone o Repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd Ueek-Challenge-App
   ```

2. **Instale as Dependências**:
   ```bash
   npm install
   ```

3. **Inicie o Servidor de Desenvolvimento**:
   ```bash
   ng serve
   ```

4. **Acesse no Navegador**:
   - O projeto estará disponível em `http://localhost:4200`.

---

## 🧪 Testes

### **Executando Testes Unitários**
Para executar os testes unitários com o [Karma](https://karma-runner.github.io), utilize o comando:

```bash
ng test
```

---

## 🛠️ Comandos Úteis do Angular CLI

### **Servidor de Desenvolvimento**
Para iniciar o servidor de desenvolvimento:

```bash
ng serve
```

### **Gerar Componentes**
Para gerar um novo componente:

```bash
ng generate component component-name
```

### **Build de Produção**
Para compilar o projeto para produção:

```bash
ng build
```

Os artefatos do build serão armazenados no diretório `dist/`. O build de produção otimiza a aplicação para performance e velocidade.

---

## 📋 Estrutura do Projeto

### **Pasta `components`**
- **`map`**: Componente responsável pela renderização do mapa e controle de zoom.
- **`polygon`**: Componente para manipulação de polígonos (inserção, remoção, recoloração, etc.).

### **Pasta `services`**
- **`map.service.ts`**:
  - Gerencia a inicialização do mapa e os controles de zoom.
- **`polygon.service.ts`**:
  - Gerencia o estado dos polígonos, incluindo inserção, remoção, recoloração e ajuste de opacidade.

---

## 📄 Observações

Este projeto foi desenvolvido como parte de um desafio técnico. Todas as funcionalidades foram implementadas e testadas para garantir a qualidade e a performance. Caso tenha dúvidas ou precise de mais informações, estou à disposição.