/**
 * Infinity-Nova Bedrock/GeckoLib 3D Model Viewer (Multi-instance)
 * Loads genuine .geo.json bones, pivots, ZYX rotations, per-face pixel UVs,
 * base64-embedded textures, and live GeckoLib keyframe animations (idle & snap).
 */

(function () {
  const prefersReducedMotion = document.documentElement.dataset.motion === 'off';
  const loadedTextures = {};
  const textureCallbacks = {};

  const MODEL_META = {
    manopla: {
      title: 'Infinity Gauntlet',
      subtitle: 'geo/manopla.geo.json • 19 bones • 103 cubes',
      texture: 'manopla_3d.png',
      icon: 'manopla.png',
      accent: '#E5B842',
      glowColor: 0xE5B842,
      slot: 'Mainhand / Offhand',
      notes: 'Left-handed Uru gauntlet. Enforces MCU socket order in GUI.'
    },
    power_stone: {
      title: 'Power Stone',
      subtitle: 'geo/power_stone.geo.json • Index Knuckle',
      texture: 'manopla_3d.png',
      icon: 'power_stone.png',
      accent: '#A855F7',
      glowColor: 0x9900FF,
      slot: 'Slot 3 • Index Finger',
      notes: 'Raw energy projection.'
    },
    space_stone: {
      title: 'Space Stone',
      subtitle: 'geo/space_stone.geo.json • Middle Knuckle',
      texture: 'manopla_3d.png',
      icon: 'space_stone.png',
      accent: '#00F0FF',
      glowColor: 0x00E5FF,
      slot: 'Slot 2 • Middle Finger',
      notes: 'Spatial teleportation and singularity pulls.'
    },
    reality_stone: {
      title: 'Reality Stone',
      subtitle: 'geo/reality_stone.geo.json • Ring Knuckle',
      texture: 'manopla_3d.png',
      icon: 'reality_stone.png',
      accent: '#FF2A4B',
      glowColor: 0xFF1744,
      slot: 'Slot 1 • Ring Finger',
      notes: 'Transmutation and illusions.'
    },
    soul_stone: {
      title: 'Soul Stone',
      subtitle: 'geo/soul_stone.geo.json • Pinky Knuckle',
      texture: 'manopla_3d.png',
      icon: 'soul_stone.png',
      accent: '#FF8A00',
      glowColor: 0xFF6D00,
      slot: 'Slot 0 • Pinky Finger',
      notes: 'Life drain tether and soul awakenings.'
    },
    time_stone: {
      title: 'Time Stone',
      subtitle: 'geo/time_stone.geo.json • Thumb Socket',
      texture: 'manopla_3d.png',
      icon: 'time_stone.png',
      accent: '#00E676',
      glowColor: 0x00E676,
      slot: 'Slot 5 • Thumb',
      notes: 'Time stop and entity tick rewind.'
    },
    mind_stone: {
      title: 'Mind Stone',
      subtitle: 'geo/mind_stone.geo.json • Back of Hand Core',
      texture: 'manopla_3d.png',
      icon: 'mind_stone.png',
      accent: '#FFD600',
      glowColor: 0xFFD600,
      slot: 'Slot 4 • Center Plate',
      notes: 'Telekinesis and subjugation.'
    },
    tesseract: {
      title: 'The Tesseract',
      subtitle: 'geo/tesseract.geo.json • Outer Glass + Rotating Cores',
      texture: 'tesseract_3d.png',
      icon: 'tesseract.png',
      accent: '#38BDF8',
      glowColor: 0x00F0FF,
      slot: 'Artifact / Space Vessel',
      notes: 'Translucent containment cube housing counter-rotating cores.'
    }
  };

  function degToRad(deg) {
    return (deg || 0) * (Math.PI / 180);
  }

  function getMinecraftTexture(key, onReady) {
    if (loadedTextures[key]) {
      if (loadedTextures[key]._isLoaded && onReady) onReady();
      else if (onReady) (textureCallbacks[key] = textureCallbacks[key] || []).push(onReady);
      return loadedTextures[key];
    }

    const src =
      typeof MOD_TEXTURES !== 'undefined' && MOD_TEXTURES[key]
        ? MOD_TEXTURES[key]
        : 'textures/' + key;

    const img = new Image();
    const tex = new THREE.Texture(img);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.encoding = THREE.sRGBEncoding;

    textureCallbacks[key] = onReady ? [onReady] : [];
    img.onload = () => {
      tex.needsUpdate = true;
      tex._isLoaded = true;
      (textureCallbacks[key] || []).forEach(cb => cb());
      textureCallbacks[key] = [];
    };
    img.src = src;

    loadedTextures[key] = tex;
    return tex;
  }

  function applyBedrockUVs(geometry, uvData, texW, texH) {
    if (!uvData || typeof uvData !== 'object' || Array.isArray(uvData)) return;

    const faceOrder = ['east', 'west', 'up', 'down', 'south', 'north'];
    const uvAttr = geometry.attributes.uv;

    faceOrder.forEach((faceName, faceIdx) => {
      const f = uvData[faceName];
      const baseVertex = faceIdx * 4;
      if (!f || !f.uv || !f.uv_size) {
        for (let i = 0; i < 4; i++) uvAttr.setXY(baseVertex + i, 0, 1);
        return;
      }

      const [u, v] = f.uv;
      const [uw, vh] = f.uv_size;

      const u0 = u / texW;
      const u1 = (u + uw) / texW;
      const vTop = 1.0 - v / texH;
      const vBottom = 1.0 - (v + vh) / texH;

      uvAttr.setXY(baseVertex + 0, u0, vTop);
      uvAttr.setXY(baseVertex + 1, u1, vTop);
      uvAttr.setXY(baseVertex + 2, u0, vBottom);
      uvAttr.setXY(baseVertex + 3, u1, vBottom);
    });

    uvAttr.needsUpdate = true;
  }

  function sampleKeyframeVector(kfMap, time) {
    if (!kfMap) return [0, 0, 0];
    if (Array.isArray(kfMap)) return kfMap;
    const keys = Object.keys(kfMap).map(parseFloat).sort((a, b) => a - b);
    if (keys.length === 0) return [0, 0, 0];

    const getVec = k => {
      const entry =
        kfMap[String(k)] ??
        kfMap[k.toFixed(2)] ??
        kfMap[k.toFixed(1)] ??
        kfMap[Object.keys(kfMap).find(x => Math.abs(parseFloat(x) - k) < 1e-4)];
      if (!entry) return [0, 0, 0];
      return entry.vector || entry.post || [0, 0, 0];
    };

    if (time <= keys[0]) return getVec(keys[0]);
    if (time >= keys[keys.length - 1]) return getVec(keys[keys.length - 1]);

    for (let i = 0; i < keys.length - 1; i++) {
      const t0 = keys[i],
        t1 = keys[i + 1];
      if (time >= t0 && time <= t1) {
        const alpha = t1 === t0 ? 0 : (time - t0) / (t1 - t0);
        const s = alpha * alpha * (3 - 2 * alpha);
        const v0 = getVec(t0);
        const v1 = getVec(t1);
        return [
          v0[0] + (v1[0] - v0[0]) * s,
          v0[1] + (v1[1] - v0[1]) * s,
          v0[2] + (v1[2] - v0[2]) * s
        ];
      }
    }
    return [0, 0, 0];
  }

  function create3DViewer(containerEl, initialKey, rootEl) {
    if (!containerEl) return null;

    let scene, camera, renderer, controls;
    let modelGroup = null;
    let boneStates = {};
    let particleSystem = null;
    let particleVelocities = [];

    let autoRotate = !prefersReducedMotion;
    let isWireframe = false;
    let currentModelKey = initialKey || 'manopla';
    let activeAnimName =
      currentModelKey === 'manopla' && !prefersReducedMotion ? 'idle' : null;
    let animTime = 0;
    let snapParticlesSpawned = false;
    let isVisible = true;
    let lastFrameTime = performance.now();
    let clock = 0;

    function updateModelButtons(modelKey) {
      const meta = MODEL_META[modelKey];
      if (!meta) return;
      const scope = rootEl || document;
      scope.querySelectorAll('[data-model-btn]').forEach(btn => {
        const isSelected = btn.getAttribute('data-model-btn') === modelKey;
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        if (isSelected) {
          btn.classList.add('is-active');
          btn.style.borderColor = meta.accent;
        } else {
          btn.classList.remove('is-active');
          btn.style.borderColor = '';
        }
      });
    }

    function renderOnce() {
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }

    function spawnSnapParticles() {
      if (particleSystem) {
        scene.remove(particleSystem);
        particleSystem.geometry.dispose();
        particleSystem.material.dispose();
      }

      const count = 90;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      particleVelocities = [];

      const palette = [
        new THREE.Color(0xE5B842),
        new THREE.Color(0x00E5FF),
        new THREE.Color(0xA855F7),
        new THREE.Color(0xFF2A4B),
        new THREE.Color(0xFF8A00),
        new THREE.Color(0x00E676)
      ];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] = 1 + (Math.random() - 0.5) * 4;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3;

        const c = palette[i % palette.length];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        particleVelocities.push({
          vx: (Math.random() - 0.5) * 0.16,
          vy: 0.04 + Math.random() * 0.14,
          vz: (Math.random() - 0.5) * 0.16,
          life: 1.0
        });
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        transparent: true,
        opacity: 0.95
      });

      particleSystem = new THREE.Points(geo, mat);
      scene.add(particleSystem);
    }

    function updateParticles() {
      if (!particleSystem) return;
      const posAttr = particleSystem.geometry.attributes.position;
      let alive = 0;

      for (let i = 0; i < particleVelocities.length; i++) {
        const v = particleVelocities[i];
        if (v.life <= 0) continue;
        v.life -= 0.015;
        alive++;

        posAttr.setXYZ(
          i,
          posAttr.getX(i) + v.vx,
          posAttr.getY(i) + v.vy,
          posAttr.getZ(i) + v.vz
        );
      }

      posAttr.needsUpdate = true;
      particleSystem.material.opacity = Math.max(0, alive / particleVelocities.length);

      if (alive === 0) {
        scene.remove(particleSystem);
        particleSystem.geometry.dispose();
        particleSystem.material.dispose();
        particleSystem = null;
      }
    }

    function applyGauntletAnimation(dt) {
      if (
        currentModelKey !== 'manopla' ||
        !activeAnimName ||
        typeof MOD_ANIMATIONS === 'undefined'
      )
        return;
      const anim = MOD_ANIMATIONS[activeAnimName];
      if (!anim || !anim.bones) return;

      animTime += dt;
      const len = anim.animation_length || 1.0;

      if (activeAnimName === 'snap' && animTime >= 0.48 && !snapParticlesSpawned) {
        snapParticlesSpawned = true;
        spawnSnapParticles();
      }

      if (animTime >= len) {
        if (anim.loop === true) {
          animTime = animTime % len;
        } else {
          activeAnimName = prefersReducedMotion ? null : 'idle';
          animTime = 0;
          snapParticlesSpawned = false;
          Object.values(boneStates).forEach(st => {
            st.group.position.copy(st.restPos);
            st.group.rotation.set(st.restRot.x, st.restRot.y, st.restRot.z, 'ZYX');
          });
          return;
        }
      }

      Object.entries(anim.bones).forEach(([boneName, channels]) => {
        const st = boneStates[boneName];
        if (!st) return;

        if (channels.rotation) {
          const rv = sampleKeyframeVector(channels.rotation, animTime);
          st.group.rotation.set(
            st.restRot.x - degToRad(rv[0]),
            st.restRot.y - degToRad(rv[1]),
            st.restRot.z - degToRad(rv[2]),
            'ZYX'
          );
        }

        if (channels.position) {
          const pv = sampleKeyframeVector(channels.position, animTime);
          st.group.position.set(
            st.restPos.x + pv[0],
            st.restPos.y + pv[1],
            st.restPos.z + pv[2]
          );
        }
      });
    }

    function buildBedrockModel(modelKey) {
      if (typeof MOD_GEO_MODELS === 'undefined' || !MOD_GEO_MODELS[modelKey]) return;
      const geoJson = MOD_GEO_MODELS[modelKey];
      const meta = MODEL_META[modelKey];

      if (modelGroup) {
        scene.remove(modelGroup);
        modelGroup.traverse(obj => {
          if (obj.isMesh) {
            obj.geometry.dispose();
            if (obj.material) obj.material.dispose();
          }
        });
      }

      boneStates = {};
      modelGroup = new THREE.Group();

      const tex = getMinecraftTexture(meta.texture, renderOnce);
      const texW = geoJson.texture_width || 64;
      const texH = geoJson.texture_height || 64;

      const boneMap = {};
      const bonePivotMap = {};

      geoJson.bones.forEach(b => {
        const group = new THREE.Group();
        group.name = b.name;
        group.rotation.order = 'ZYX';
        boneMap[b.name] = group;
        bonePivotMap[b.name] = b.pivot || [0, 0, 0];
      });

      const stoneColorMap = {
        stone_power: 0x9900FF,
        stone_space: 0x00E5FF,
        stone_reality: 0xFF1744,
        stone_soul: 0xFF6D00,
        stone_time: 0x00E676,
        stone_mind: 0xFFD600
      };

      geoJson.bones.forEach(b => {
        const boneObj = boneMap[b.name];
        const bPivot = b.pivot || [0, 0, 0];
        const pPivot =
          b.parent && bonePivotMap[b.parent] ? bonePivotMap[b.parent] : [0, 0, 0];

        const restPos = new THREE.Vector3(
          bPivot[0] - pPivot[0],
          bPivot[1] - pPivot[1],
          bPivot[2] - pPivot[2]
        );
        boneObj.position.copy(restPos);

        const restRot = new THREE.Vector3(
          b.rotation ? -degToRad(b.rotation[0]) : 0,
          b.rotation ? -degToRad(b.rotation[1]) : 0,
          b.rotation ? -degToRad(b.rotation[2]) : 0
        );
        boneObj.rotation.set(restRot.x, restRot.y, restRot.z, 'ZYX');

        boneStates[b.name] = {
          group: boneObj,
          restPos: restPos.clone(),
          restRot: restRot.clone()
        };

        const isStoneBone = Boolean(stoneColorMap[b.name]) || b.name === 'stone';
        const isTesseractGlass = b.name === 'outer_glass';
        const isTesseractCore =
          b.name === 'inner_core' || b.name === 'mid_energy' || b.name === 'mid_ring';

        (b.cubes || []).forEach(c => {
          const [sx, sy, sz] = c.size;
          const [ox, oy, oz] = c.origin;
          const boxGeo = new THREE.BoxGeometry(
            Math.max(sx, 0.01),
            Math.max(sy, 0.01),
            Math.max(sz, 0.01)
          );
          applyBedrockUVs(boxGeo, c.uv, texW, texH);

          let mat;
          if (isTesseractGlass) {
            mat = new THREE.MeshStandardMaterial({
              map: tex,
              transparent: true,
              opacity: 0.72,
              roughness: 0.12,
              metalness: 0.1,
              depthWrite: false,
              wireframe: isWireframe
            });
          } else if (isTesseractCore) {
            mat = new THREE.MeshStandardMaterial({
              map: tex,
              emissive: 0x00E5FF,
              emissiveMap: tex,
              emissiveIntensity: 1.4,
              roughness: 0.2,
              wireframe: isWireframe
            });
          } else if (isStoneBone) {
            const glowHex = stoneColorMap[b.name] || meta.glowColor || 0xFFFFFF;
            mat = new THREE.MeshStandardMaterial({
              map: tex,
              emissive: glowHex,
              emissiveMap: tex,
              emissiveIntensity: 0.85,
              roughness: 0.15,
              metalness: 0.15,
              wireframe: isWireframe
            });
          } else {
            mat = new THREE.MeshStandardMaterial({
              map: tex,
              roughness: 0.34,
              metalness: 0.65,
              wireframe: isWireframe
            });
          }

          const mesh = new THREE.Mesh(boxGeo, mat);
          const cx = ox + sx / 2;
          const cy = oy + sy / 2;
          const cz = oz + sz / 2;

          if (c.rotation) {
            const cPivot = c.pivot || bPivot;
            const cubeGroup = new THREE.Group();
            cubeGroup.rotation.order = 'ZYX';
            cubeGroup.position.set(
              cPivot[0] - bPivot[0],
              cPivot[1] - bPivot[1],
              cPivot[2] - bPivot[2]
            );
            cubeGroup.rotation.set(
              -degToRad(c.rotation[0]),
              -degToRad(c.rotation[1]),
              -degToRad(c.rotation[2]),
              'ZYX'
            );
            mesh.position.set(cx - cPivot[0], cy - cPivot[1], cz - cPivot[2]);
            cubeGroup.add(mesh);
            boneObj.add(cubeGroup);
          } else {
            mesh.position.set(cx - bPivot[0], cy - bPivot[1], cz - bPivot[2]);
            boneObj.add(mesh);
          }
        });

        if (b.parent && boneMap[b.parent]) {
          boneMap[b.parent].add(boneObj);
        } else {
          modelGroup.add(boneObj);
        }
      });

      const box = new THREE.Box3().setFromObject(modelGroup);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      modelGroup.position.sub(center);

      const wrapper = new THREE.Group();
      wrapper.add(modelGroup);

      const accentLight = new THREE.PointLight(meta.glowColor, 1.15, 26);
      accentLight.position.set(0, 2, 7);
      wrapper.add(accentLight);

      modelGroup = wrapper;
      scene.add(modelGroup);

      const maxDim = Math.max(size.x, size.y, size.z);
      const dist = maxDim * 2.15;
      camera.position.set(dist * 0.45, dist * 0.2, dist);
      controls.target.set(0, 0, 0);
      controls.minDistance = maxDim * 0.8;
      controls.maxDistance = maxDim * 4.5;
      controls.update();

      updateModelButtons(modelKey);
      renderOnce();
    }

    function setupLighting() {
      const ambient = new THREE.AmbientLight(0xFFFFFF, 0.9);
      scene.add(ambient);

      const keyLight = new THREE.DirectionalLight(0xFFF6E5, 1.35);
      keyLight.position.set(12, 20, 16);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x8AC7FF, 0.75);
      fillLight.position.set(-14, 4, 10);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xA855F7, 0.8);
      rimLight.position.set(0, -10, -14);
      scene.add(rimLight);
    }

    scene = new THREE.Scene();

    const width = containerEl.clientWidth || 640;
    const height = containerEl.clientHeight || 480;
    camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 200);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerEl.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false;

    setupLighting();
    buildBedrockModel(currentModelKey);

    if (typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(
        entries => {
          isVisible = entries[0].isIntersecting;
          if (isVisible) renderOnce();
        },
        { rootMargin: '200px' }
      );
      io.observe(containerEl);
    }

    window.addEventListener('resize', () => {
      if (!containerEl || !renderer || !camera) return;
      const w = containerEl.clientWidth;
      const h = containerEl.clientHeight || 480;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderOnce();
    });

    function animate() {
      requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      if (!isVisible) return;
      clock += dt;

      if (controls) controls.update();

      if (modelGroup && autoRotate) {
        modelGroup.rotation.y += 0.006;
      }

      if (currentModelKey === 'manopla') {
        applyGauntletAnimation(dt);
      }

      if (currentModelKey === 'tesseract' && !prefersReducedMotion) {
        if (boneStates.inner_core) {
          boneStates.inner_core.group.rotation.y += 0.02;
          boneStates.inner_core.group.rotation.x += 0.012;
        }
        if (boneStates.mid_energy) {
          boneStates.mid_energy.group.rotation.y -= 0.014;
          boneStates.mid_energy.group.rotation.z += 0.01;
        }
        if (boneStates.mid_ring) {
          boneStates.mid_ring.group.rotation.x -= 0.016;
        }
      }

      if (currentModelKey !== 'manopla' && modelGroup && !prefersReducedMotion) {
        modelGroup.position.y = Math.sin(clock * 2.0) * 0.2;
      } else if (modelGroup) {
        modelGroup.position.y = 0;
      }

      updateParticles();
      renderOnce();
    }

    animate();

    return {
      selectModel: function (key) {
        currentModelKey = key;
        activeAnimName = key === 'manopla' && !prefersReducedMotion ? 'idle' : null;
        animTime = 0;
        buildBedrockModel(key);
      },
      playSnap: function () {
        if (currentModelKey !== 'manopla') {
          currentModelKey = 'manopla';
          buildBedrockModel('manopla');
        }
        activeAnimName = 'snap';
        animTime = 0;
        snapParticlesSpawned = false;
      },
      resetCamera: function () {
        buildBedrockModel(currentModelKey);
      },
      toggleAutoRotate: function (btn) {
        autoRotate = !autoRotate;
        if (btn) btn.setAttribute('aria-pressed', autoRotate ? 'true' : 'false');
        return autoRotate;
      },
      toggleWireframe: function (btn) {
        isWireframe = !isWireframe;
        if (btn) btn.setAttribute('aria-pressed', isWireframe ? 'true' : 'false');
        buildBedrockModel(currentModelKey);
        return isWireframe;
      }
    };
  }

  let primaryViewer = null;

  window.create3DViewer = function (containerEl, initialKey, rootEl) {
    const instance = create3DViewer(containerEl, initialKey, rootEl);
    if (!primaryViewer && instance) primaryViewer = instance;
    return instance;
  };

  window.init3DViewer = function (containerId, initialKey) {
    const el = document.getElementById(containerId);
    const rootEl = el ? el.closest('[data-viewer-root]') || document : document;
    return window.create3DViewer(el, initialKey, rootEl);
  };

  window.select3DModel = function (key) {
    if (primaryViewer) primaryViewer.selectModel(key);
  };

  window.playSnapAnimation = function () {
    if (primaryViewer) primaryViewer.playSnap();
  };

  window.toggleAutoRotate = function (btn) {
    return primaryViewer ? primaryViewer.toggleAutoRotate(btn) : false;
  };

  window.toggleWireframe = function (btn) {
    return primaryViewer ? primaryViewer.toggleWireframe(btn) : false;
  };

  window.resetCamera = function () {
    if (primaryViewer) primaryViewer.resetCamera();
  };
})();
