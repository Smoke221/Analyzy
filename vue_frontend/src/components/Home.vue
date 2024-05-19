<template>
  <div>
    <main>
      <div class="intro">
        <h2>Read your documents faster.</h2>
        <p class="intro-text">
          **Uncover hidden insights in your documents!** Our powerful analysis
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
            <p>Save hours instead of reading PDFs manually yourself.</p>
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
.intro {
  text-align: center;
  padding: 2rem;
}

.intro-text {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.analyze-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.analyze-button:hover {
  background-color: #0069d9;
}

.benefits {
  margin-top: 2rem;
  text-align: center;
}

.benefits h2 {
  margin-bottom: 1rem;
  font-size: 3rem;
  color: #333;
}

.benefits ul {
  list-style: none;
  padding: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

.benefits li {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 30%;
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
  color: #007bff;
  text-align: center;
}

.why-analyzy {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.content {
  max-width: 500px;
  margin-right: 20px;
}

.why-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.benefit-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.benefit-title .highlight {
  color: #e74c3c;
}

.description {
  font-size: 18px;
  margin-bottom: 20px;
  color: #666;
}

.get-started-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.get-started-button:hover {
  background-color: #2980b9;
}

.image-container {
  max-width: 500px;
}

.analyzy-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
