import { OrthographicCamera } from 'three';
import VglCamera from './vgl-camera';
import { number } from '../validators';

/**
 * Camera that uses orthographic projection,
 * corresponding [THREE.OrthographicCamera](https://threejs.org/docs/index.html#api/cameras/OrthographicCamera).
 * Camera frustum top, bottom, left, and right planes are automatically set to the renderer size.
 *
 * Properties of [VglCamera](vgl-camera) are also available as mixin.
 */

export default {
  mixins: [VglCamera],
  props: {
    /** Zoom factor of the camera. */
    zoom: { type: number, default: 1 },
    /** Camera frustum near plane. */
    near: { type: number, default: 0.1 },
    /** Camera frustum far plane. */
    far: { type: number, default: 2000 },
  },
  computed: {
    inst: () => new OrthographicCamera(),
  },
  watch: {
    inst: {
      handler(inst) {
        Object.assign(inst, {
          zoom: parseFloat(this.zoom),
          near: parseFloat(this.near),
          far: parseFloat(this.far),
        });
        inst.updateProjectionMatrix();
      },
      immediate: true,
    },
    zoom(zoom) { this.inst.zoom = parseFloat(zoom); this.inst.updateProjectionMatrix(); },
    near(near) { this.inst.near = parseFloat(near); this.inst.updateProjectionMatrix(); },
    far(far) { this.inst.far = parseFloat(far); this.inst.updateProjectionMatrix(); },
  },
};
