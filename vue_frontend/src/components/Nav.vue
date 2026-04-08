<template>
  <div class="navbar">
    <div class="nav-logo">
      <router-link to="/">Analyzy</router-link>
    </div>
    <div class="nav-items">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/analyzy">Analyze</router-link>
        </li>
      </ul>
    </div>
    <div class="nav-button" v-if="isLoggedIn">
      <h6 class="greeting">Welcome, {{ username }}</h6>
      <a href="#" role="button" @click.prevent="logout">Logout</a>
    </div>
    <div class="nav-button" v-else>
      <div class="anim-layer"></div>
      <router-link to="/auth">Sign in (optional)</router-link>
    </div>
    <button
      type="button"
      class="hamburger"
      aria-label="Open menu"
      @click="toggleMobileMenu"
    >
      &#9776;
    </button>
  </div>

  <div
    class="mobile-drawer"
    :class="{ 'mobile-drawer--open': isMobileMenuOpen }"
    aria-hidden="true"
  >
    <div class="mobile-drawer__inner">
      <button
        type="button"
        class="mobile-drawer__close"
        aria-label="Close menu"
        @click="toggleMobileMenu"
      >
        &#10006;
      </button>
      <ul class="mobile-drawer__list">
        <li>
          <router-link to="/" @click="closeMobileMenu">Home</router-link>
        </li>
        <li>
          <router-link to="/analyzy" @click="closeMobileMenu">Analyze</router-link>
        </li>
        <li>
          <router-link to="/auth" @click="closeMobileMenu">Sign in (optional)</router-link>
        </li>
      </ul>
    </div>
  </div>
  <div
    v-if="isMobileMenuOpen"
    class="mobile-drawer__backdrop"
    aria-hidden="true"
    @click="closeMobileMenu"
  />
</template>

<script>
import { getApiBaseUrl } from "../apiBase.js";

export default {
  name: "NavBar",
  data() {
    return {
      isMobileMenuOpen: false,
      isLoggedIn: false,
      username: "",
    };
  },
  watch: {
    $route() {
      this.refreshAuthFromStorage();
      this.closeMobileMenu();
    },
  },
  created() {
    this.refreshAuthFromStorage();
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      if (window.innerWidth > 770) {
        this.isMobileMenuOpen = false;
      }
    },
    refreshAuthFromStorage() {
      const user = sessionStorage.getItem("userName");
      this.isLoggedIn = !!user;
      this.username = user || "";
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (window.innerWidth > 770) {
        this.isMobileMenuOpen = false;
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    async logout() {
      try {
        await fetch(`${getApiBaseUrl()}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (e) {
        console.error(e);
      }
      sessionStorage.removeItem("userName");
      this.isLoggedIn = false;
      this.username = "";
    },
  },
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  display: flex;
  padding: 10px;
  background-color: var(--color-nav, #2e2e3a);
  justify-content: space-around;
  align-items: center;
  z-index: 50;
}

.nav-logo {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 32px;
}

.nav-items > ul > li {
  position: relative;
  display: inline;
  list-style: none;
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.nav-items > ul > li > a {
  color: white;
  text-decoration: none;
}

.nav-items > ul > li > a.router-link-active,
.nav-items > ul > li > a.router-link-exact-active {
  color: #de9151;
  font-weight: 600;
}

.nav-items > ul > li::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 0.17rem;
  background-color: #de9151;
  left: 0;
  bottom: 0;
  transform-origin: 0% 100%;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-items > ul > li:hover::after {
  transform: scaleX(1);
}

.nav-logo a,
.nav-button a {
  color: white;
  list-style: none;
  text-decoration: none;
  display: flex;
}

.nav-button {
  background-color: #de9151;
  border-radius: 50px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.greeting {
  margin: 5px;
}

.anim-layer {
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 100%;
  background-color: white;
  transition:
    width 0.3s ease,
    left 0.3s ease;
}

.nav-button:hover .anim-layer {
  width: 100%;
  left: 0;
}

.nav-button:hover a {
  color: #141214;
}

.nav-button a {
  display: block;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  position: relative;
  z-index: 1;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
}

.mobile-drawer {
  display: none;
}

.mobile-drawer__backdrop {
  display: none;
}

@media only screen and (max-width: 770px) {
  .nav-items > ul,
  .nav-button {
    display: none;
  }

  .hamburger {
    display: block;
  }

  .mobile-drawer__backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 60;
  }

  .mobile-drawer {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: min(100%, 320px);
    height: 100vh;
    background: #3d3d4a;
    z-index: 70;
    transform: translateX(-100%);
    transition: transform 0.28s ease;
    flex-direction: column;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);
  }

  .mobile-drawer--open {
    transform: translateX(0);
  }

  .mobile-drawer__inner {
    position: relative;
    padding: 4rem 1.5rem 1.5rem;
    flex: 1;
  }

  .mobile-drawer__close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    line-height: 1;
  }

  .mobile-drawer__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-drawer__list li {
    margin: 0.75rem 0;
  }

  .mobile-drawer__list a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .mobile-drawer__list a.router-link-active,
  .mobile-drawer__list a.router-link-exact-active {
    color: #de9151;
  }
}
</style>
