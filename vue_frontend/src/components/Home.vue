<template>
  <div>
    <main>
      <div class="intro">
        <h2>Read your documents faster.</h2>
        <p class="intro-text">
          <span>Uncover hidden insights in your documents!</span> Our powerful analysis
          engine, powered by the AI, will extract key information and provide
          you with a clear understanding of your documents' content. Ask
          follow-up questions to delve deeper and get the most out of your data.
        </p>

        <button class="analyze-button" @click="$router.push('/analyzy')">Analyze Files</button>

      </div>

      <div class="benefits">
        <h2>Benefits</h2>
        <ul>
          <li>
            <img src="../assets/artificial-intelligence-ai-icon.svg" alt="">
            <h4>AI-Powered</h4>
            <p>Get answers to your questions within seconds.</p>
          </li>
          <li>
            <img src="../assets/time-management-icon.svg" alt="">
            <h4>Save Time</h4>
            <p>Save hours of reading PDFs manually yourself.</p>
          </li>
          <li>
            <img src="../assets/folder-lock-icon.svg" alt="">
            <h4>Secure</h4>
            <p>Your files are secure and can be deleted anytime.</p>
          </li>
        </ul>
      </div>

      <div class="why-analyzy">
        <div class="content">
          <p class="why-title">WHY ANALYZY</p>
          <h3 class="benefit-title">
            Analyzy <span class="highlight">saves 95%</span> of your time spent
            reading docs.
          </h3>
          <p class="description">
            You have too many files to read as is. Stop wasting time. Instead,
            have the Analyzy AI read your files and answer your questions. Get
            ready to save some serious time and impress your boss!
          </p>
          <button class="get-started-button" @click="$router.push('/analyzy')">GET STARTED</button>
        </div>
        <div class="image-container">
          <img alt="Analyzy in action" src="../assets/Analyzy-Execution.png" class="analyzy-image" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.intro,
.benefits,
.why-analyzy {
  padding: 2rem;
  margin: 0 auto;
  max-width: 80%;
}
.intro{
  max-width: 70%;
}
.intro-text {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.analyze-button {
  background-color: #DE9151;
  color: white;
  padding: 10px 20px;
  border: none;
}

.analyze-button:hover {
  background-color: #de9151c3;
}

.benefits {
  text-align: center;
}

.benefits h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #333;
}

.benefits ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.benefits li {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: calc(33.33% - 20px);
  height: 250px;
}

.benefits li img {
  max-width: 100px;
  height: auto;
  margin-bottom: 1rem;
}

.benefits li h4 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: #333;
}

.benefits li p {
  margin: 0;
  font-size: 1.1rem;
  color: #BBB8B2;
  text-align: center;
}

.why-analyzy {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px;
}

.content {
  max-width: 500px;
}

.why-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.benefit-title {
  font-size: 2rem;
}

.benefit-title .highlight {
  color: #DE9151;
}

.description {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #666;
}

.get-started-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #DE9151;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.get-started-button:hover {
  background-color: #DE9151;
}
</style>
