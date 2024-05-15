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

        <button class="analyze-button" @click="$router.push('/analyze')">Analyze Files</button>

      </div>

      <div class="benefits">
        <h2>Benefits</h2>
        <ul>
          <li>
            <h4>AI-Powered</h4>
            <p>Get answers to your questions within seconds.</p>
          </li>
          <li>
            <h4>Save Time</h4>
            <p>Save hours instead of reading PDFs manually yourself.</p>
          </li>
          <li>
            <h4>Secure</h4>
            <p>Your files are secure and can be deleted anytime.</p>
          </li>
        </ul>
      </div>

      <div class="why-analyzy">
        <div>
          <p>WHY ANALYZY</p>
          <h3 class="benefit-title">
            Analyzy <span class="highlight">saves 95%</span> of your time spent
            reading docs.
          </h3>
          <p>
            You have too many files to read as is. Stop wasting time. Instead,
            have the Analyzy AI read your files and answer your questions. Get
            ready to save some serious time and impress your boss!
          </p>
          <button class="get-started-button">GET STARTED</button>
        </div>
        <div>
          <img
            alt="Analyzy in action"
            src="./assets/vue.svg"
            class="analyzy-image"
          />
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
}

.benefits ul {
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.benefits li {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.benefits li p {
  margin-right: 1rem;
  font-size: 1.2rem;
  color: #007bff;
}
.why-analyzy {
  width: 80%;
  display: flex;
  align-items: centre;
  justify-content: space-around;
}
</style>
