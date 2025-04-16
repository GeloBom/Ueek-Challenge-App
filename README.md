# Ueek Challenge App

Este projeto foi desenvolvido utilizando [Angular CLI](https://github.com/angular/angular-cli) versão 19.2.5 e integra funcionalidades de manipulação de polígonos em um mapa global utilizando a biblioteca OpenLayers.

---
  
## 🖥️ Tecnologias Utilizadas
  ![@](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
  ![@](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![@](https://img.shields.io/badge/OpenLayers-1F6FEB?style=for-the-badge&logo=OpenStreetMap&logoColor=white)
  ![@](https://img.shields.io/badge/Karma-Testing-3DDC84?style=for-the-badge&logo=karma&logoColor=white)
  ![@](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![@](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- **Angular 16+**: Framework para construção de aplicações web modernas.
- **TypeScript**: Linguagem de programação.
- **OpenLayers**: Biblioteca para renderização e manipulação de mapas interativos.
- **Karma**: Ferramenta de testes para garantir a qualidade do código.
- **HTML e SCSS**: Para estruturação e estilização da interface.

---

## 🎯 Funcionalidades

1. **Renderização de Mapa Global**:

   > O mapa é renderizado utilizando a biblioteca OpenLayers.
   
   ![](https://i.imgur.com/qy4ANSd.gif) 

2. **Inserção de Polígonos Aleatórios**:

   > Botão para adicionar de 1 a 4 polígonos aleatórios dentro da área de Lages - SC.

   ![](https://i.imgur.com/b67HfNj.gif)
     
3. **Inserção de Polígonos Individuais com Zoom Automático**:

   > Botão para adicionar um único polígono e ajustar o zoom automaticamente para centralizá-lo.

   ![](https://i.imgur.com/eyvYroC.gif)

4. **Zoom In e Zoom Out**:

   > Botões para ajustar o nível de zoom do mapa.
  
   ![](https://i.imgur.com/XBpBHtN.gif)   

5. **Remoção de Polígonos**:

   > Botão para remover todos os polígonos do mapa.
   
   ![](https://i.imgur.com/2ZAuVHB.gif)
   
   > Modo de remoção individual, onde é possível clicar em um polígono para removê-lo.
   
   ![](https://i.imgur.com/IVqBIRM.gif)

7. **Controle de Opacidade**:

   > Slider para ajustar a opacidade de todos os polígonos no mapa.
   
   ![](https://i.imgur.com/0kma50O.gif)

8. **Recoloração de Polígonos**:
   
   > Botão para aplicar cores aleatórias a todos os polígonos.

    ![](https://i.imgur.com/PuGKZRs.gif)
     
---

## 🚀 Como iniciar o Projeto

1. **Clone o Repositório**:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd Ueek-Challenge-App
   ```
2. **Instale o Angular CLI (caso ainda não tenha instalado):**

   ```bash
   npm install -g @angular/cli  
   ```
   

   
4. **Instale as Dependências**:

   ```bash
   npm install
   ```

   

5. **Inicie o Servidor de Desenvolvimento**:

   ```bash
   ng serve
   ```

6. **Acesse no Navegador**:
    ```bash
    O projeto estará disponível em `http://localhost:4200`.
    ```
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

## 📋 Estrutura do Projeto

### **Pasta `components`**

- **`map.component.ts`**: Componente responsável pela renderização do mapa e controle de zoom.
- **`polygon.component.ts`**: Componente para manipulação de polígonos (inserção, remoção, recoloração, etc.).

### **Pasta `services`**

- **`map.service.ts`**:
  - Gerencia a inicialização do mapa e os controles de zoom.
- **`polygon.service.ts`**:
  - Gerencia o estado dos polígonos, incluindo inserção, remoção, recoloração e ajuste de opacidade.

### **`Pasta utils`**

**`polygon-serializer.ts:`**

- Responsável por serializar e desserializar objetos Feature<Polygon> com seus estilos (cor de preenchimento, cor da borda e espessura).

- Permite armazenar os dados essenciais dos polígonos no localStorage e reconstruí-los com fidelidade ao carregar a aplicação.

---

## 📦 Persistência de Dados
- O estado dos polígonos é automaticamente salvo no localStorage utilizando serialização customizada para suportar estilos complexos do OpenLayers.

- Os dados são restaurados na inicialização, garantindo persistência entre sessões e maior resiliência em caso de recarregamento da página.

---

## 🌐 Deploy
- O projeto foi implantado na Vercel e está disponível publicamente no seguinte link:

🔗  https://ueek-challenge-app.vercel.app/

## 📄 Observações

Este projeto foi desenvolvido como parte de um desafio técnico. Todas as funcionalidades foram implementadas e testadas para garantir a qualidade e a performance.

