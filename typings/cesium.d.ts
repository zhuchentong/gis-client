/**
 * Created by laixiangran on 2018/10/08.
 * homepage：http://www.laixiangran.cn
 * Typescript definition for cesium 1.5x
 */

declare module Cesium {

  class Ion {
      static defaultAccessToken: string;
      static defaultServer: string;

      constructor();
  }

  type RenderState = any;

  interface Proxy {
      getURL(resource: string): string;
  }

  class ArcGisImageServerTerrainProvider {
      errorEvent: Event;
      credit: Credit;
      tilingScheme: GeographicTilingScheme;
      ready: boolean;
      hasWaterMask: boolean;
      hasVertexNormals: boolean;

      constructor(options: { url: string; token?: string; proxy?: any; tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; credit?: Credit | string });

      requestTileGeometry(x: number, y: number, level: number): Promise<TerrainData>;

      getLevelMaximumGeometricError(level: number): number;

      getTileDataAvailable(x: number, y: number, level: number): boolean;
  }

  class AssociativeArray {
      length: number;
      values: any[];

      contains(key: string | number): boolean;

      set(key: string | number, value: any): void;

      get(key: string | number): any;

      remove(key: string | number): boolean;

      removeAll(): void;
  }

  class AxisAlignedBoundingBox {
      minimum: Cartesian3;
      maximum: Cartesian3;
      center: Cartesian3;

      constructor(minimum?: Cartesian3, maximum?: Cartesian3, center?: Cartesian3);

      clone(result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox;

      intersect(plane: Cartesian4): Intersect;

      equals(right?: AxisAlignedBoundingBox): boolean;

      static fromPoints(positions: Cartesian3[], result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox;

      static clone(box: AxisAlignedBoundingBox, result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox;

      static equals(left?: AxisAlignedBoundingBox, right?: AxisAlignedBoundingBox): boolean;

      static intersect(box: AxisAlignedBoundingBox, plane: Cartesian4): Intersect;
  }

  class BoundingRectangle {
      x: number;
      y: number;
      width: number;
      height: number;

      constructor(x?: number, y?: number, width?: number, height?: number);

      clone(result?: BoundingRectangle): BoundingRectangle;

      intersect(right: BoundingRectangle): Intersect;

      equals(right?: BoundingRectangle): boolean;

      static fromPoints(positions: Cartesian2[], result?: BoundingRectangle): BoundingRectangle;

      static fromRectangle(rectangle: Rectangle, projection?: any, result?: BoundingRectangle): BoundingRectangle;

      static clone(rectangle: BoundingRectangle, result?: BoundingRectangle): BoundingRectangle;

      static union(left: BoundingRectangle, right: BoundingRectangle, result?: BoundingRectangle): BoundingRectangle;

      static expand(rectangle: BoundingRectangle, point: Cartesian2, result?: BoundingRectangle): BoundingRectangle;

      static intersect(left: BoundingRectangle, right: BoundingRectangle): Intersect;

      static equals(left?: BoundingRectangle, right?: BoundingRectangle): boolean;
  }

  class BoundingSphere {
      static packedLength: number;
      center: Cartesian3;
      radius: number;

      constructor(center?: Cartesian3, radius?: number);

      static fromPoints(positions: Cartesian3[], result?: BoundingSphere): BoundingSphere;

      static fromRectangle2D(rectangle: Rectangle, projection?: any, result?: BoundingSphere): BoundingSphere;

      static fromRectangleWithHeights2D(rectangle: Rectangle, projection?: any, minimumHeight?: number, maximumHeight?: number, result?: BoundingSphere): BoundingSphere;

      static fromRectangle3D(rectangle: Rectangle, ellipsoid?: Ellipsoid, surfaceHeight?: number, result?: BoundingSphere): BoundingSphere;

      static fromVertices(positions: Cartesian3[], center?: Cartesian3, stride?: number, result?: BoundingSphere): BoundingSphere;

      static fromCornerPoints(corner?: number, oppositeCorner?: number, result?: BoundingSphere): BoundingSphere;

      static fromEllipsoid(ellipsoid: Ellipsoid, result?: BoundingSphere): BoundingSphere;

      static fromBoundingSpheres(boundingSpheres: BoundingSphere[], result?: BoundingSphere): BoundingSphere;

      static fromEncodedCartesianVertices(positionsHigh?: number[], positionsLow?: number[], result?: BoundingSphere): BoundingSphere;

      static fromOrientedBoundingBox(orientedBoundingBox: OrientedBoundingBox, result?: BoundingSphere): BoundingSphere;

      static clone(sphere: BoundingSphere, result?: BoundingSphere): BoundingSphere;

      static pack(value: BoundingSphere, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: BoundingSphere): BoundingSphere;

      static union(left: BoundingSphere, right: BoundingSphere, result?: BoundingSphere): BoundingSphere;

      static expand(sphere: BoundingSphere, point: Cartesian3, result?: BoundingSphere): BoundingSphere;

      static intersect(sphere: BoundingSphere, plane: Cartesian4): Intersect;

      static transform(sphere: BoundingSphere, transform: Matrix4, result?: BoundingSphere): BoundingSphere;

      static distanceSquaredTo(sphere: BoundingSphere, cartesian: Cartesian3): number;

      static transformWithoutScale(sphere: BoundingSphere, transform: Matrix4, result?: BoundingSphere): BoundingSphere;

      static computePlaneDistances(sphere: BoundingSphere, position: Cartesian3, direction: Cartesian3, result?: Cartesian2): Interval;

      static projectTo2D(sphere: BoundingSphere, projection?: any, result?: BoundingSphere): BoundingSphere;

      static equals(left?: BoundingSphere, right?: BoundingSphere): boolean;

      static intersectPlane(sphere: BoundingSphere, plane: Plane): Intersect;

      static isOccluded(sphere: BoundingSphere, occluder: Occluder): boolean;

      intersect(plane: Cartesian4): Intersect;

      equals(right?: BoundingSphere): boolean;

      clone(result?: BoundingSphere): BoundingSphere;

      computePlaneDistances(position: Cartesian3, direction: Cartesian3, result?: Interval): Interval;

      distanceSquaredTo(cartesian: Cartesian3): number;

      intersectPlane(plane: Plane): Intersect;

      isOccluded(occluder: Occluder): boolean;
  }

  class OrientedBoundingBox {
      center: Cartesian3;
      halfAxes: Matrix3;

      constructor(center?: Cartesian3, halfAxes?: Matrix3);

      static clone(box: OrientedBoundingBox, result?: OrientedBoundingBox): OrientedBoundingBox;

      static computePlaneDistances(box: OrientedBoundingBox, position: Cartesian3, direction: Cartesian3, result?: Interval): Interval;

      static distanceSquaredTo(box: OrientedBoundingBox, cartesian: Cartesian3): number;

      static equals(left: OrientedBoundingBox, right: OrientedBoundingBox): boolean;

      static fromPoints(positions: Cartesian3[], result?: OrientedBoundingBox): OrientedBoundingBox;

      static fromRectangle(rectangle: Rectangle, minimumHeight?: number, maximumHeight?: number, ellipsoid?: Ellipsoid, result?: OrientedBoundingBox): OrientedBoundingBox;

      static intersectPlane(box: OrientedBoundingBox, plane: Plane): Intersect;

      static isOccluded(box: OrientedBoundingBox, occluder: Occluder): boolean;

      clone(result?: OrientedBoundingBox): OrientedBoundingBox;

      computePlaneDistances(position: Cartesian3, direction: Cartesian3, result?: Interval): Interval;

      distanceSquaredTo(cartesian: Cartesian3): number;

      equals(right: OrientedBoundingBox): boolean;

      intersectPlane(plane: Plane): Intersect;

      isOccluded(occluder: Occluder): boolean;
  }

  class BoxGeometry {
      static packedLength: number;

      constructor(options: {
          minimumCorner: Cartesian3;
          maximumCorner: Cartesian3;
          vertexFormat?: VertexFormat
      });

      static createGeometry(boxGeometry: BoxGeometry): Geometry | undefined;

      static fromAxisAlignedBoundingBox(boundingBox: AxisAlignedBoundingBox): BoxGeometry;

      static fromDimensions(options: { dimensions: Cartesian3, vertexFormat?: VertexFormat }): BoxGeometry;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: BoxGeometry): BoxGeometry;
  }

  class BoxOutlineGeometry {
      static packedLength: number;

      constructor();

      static fromDimensions(): BoxOutlineGeometry;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: BoxOutlineGeometry): BoxOutlineGeometry;

      static createGeometry(boxGeometry: BoxOutlineGeometry): Geometry | undefined;
  }

  class Cartesian2 {
      x: number;
      y: number;
      static packedLength: number;
      static ZERO: Cartesian2;
      static UNIT_X: Cartesian2;
      static UNIT_Y: Cartesian2;

      constructor(x?: number, y?: number);

      clone(result?: Cartesian2): Cartesian2;

      equals(right?: Cartesian2): boolean;

      equalsEpsilon(right: Cartesian2, relativeEpsilon: number, absoluteEpsilon?: number): boolean;

      toString(): string;

      static fromElements(x: number, y: number, result?: Cartesian2): Cartesian2;

      static clone(cartesian: Cartesian2, result?: Cartesian2): Cartesian2;

      static fromCartesian3(cartesian: Cartesian3, result?: Cartesian2): Cartesian2;

      static fromCartesian4(cartesian: Cartesian4, result?: Cartesian2): Cartesian2;

      static pack(value: Cartesian2, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Cartesian2): Cartesian2;

      static fromArray(array: number[], startingIndex?: number, result?: Cartesian2): Cartesian2;

      static maximumComponent(cartesian: Cartesian2): number;

      static minimumComponent(cartesian: Cartesian2): number;

      static minimumByComponent(first: Cartesian2, second: Cartesian2, result: Cartesian2): Cartesian2;

      static maximumByComponent(first: Cartesian2, second: Cartesian2, result: Cartesian2): Cartesian2;

      static magnitudeSquared(cartesian: Cartesian2): number;

      static magnitude(cartesian: Cartesian2): number;

      static distance(left: Cartesian2, right: Cartesian2): number;

      static distanceSquared(left: Cartesian2, right: Cartesian2): number;

      static normalize(cartesian: Cartesian2, result: Cartesian2): Cartesian2;

      static dot(left: Cartesian2, right: Cartesian2): number;

      static multiplyComponents(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2;

      static add(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2;

      static subtract(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2;

      static multiplyByScalar(cartesian: Cartesian2, scalar: number, result: Cartesian2): Cartesian2;

      static divideByScalar(cartesian: Cartesian2, scalar: number, result: Cartesian2): Cartesian2;

      static negate(cartesian: Cartesian2, result: Cartesian2): Cartesian2;

      static abs(cartesian: Cartesian2, result: Cartesian2): Cartesian2;

      static lerp(start: Cartesian2, end: Cartesian2, t: number, result: Cartesian2): Cartesian2;

      static angleBetween(left: Cartesian2, right: Cartesian2): number;

      static mostOrthogonalAxis(cartesian: Cartesian2, result: Cartesian2): Cartesian2;

      static equals(left?: Cartesian2, right?: Cartesian2): boolean;

      static equalsEpsilon(left: Cartesian2, right: Cartesian2, relativeEpsilon: number, absoluteEpsilon?: number): boolean;
  }

  class Cartesian3 implements PositionProperty {
      x: number;
      y: number;
      z: number;
      static packedLength: number;
      static ZERO: Cartesian3;
      static UNIT_X: Cartesian3;
      static UNIT_Y: Cartesian3;
      static UNIT_Z: Cartesian3;

      constructor(x?: number, y?: number, z?: number);

      clone(result?: Cartesian3): Cartesian3;

      equals(right?: Cartesian3): boolean;

      equalsEpsilon(right: Cartesian3, relativeEpsilon: number, absoluteEpsilon?: number): boolean;

      toString(): string;

      static fromSpherical(spherical: Spherical, result?: Cartesian3): Cartesian3;

      static fromElements(x: number, y: number, z: number, result?: Cartesian3): Cartesian3;

      static clone(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      static fromCartesian4(cartesian: Cartesian4, result?: Cartesian3): Cartesian3;

      static pack(value: Cartesian3, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Cartesian3): Cartesian3;

      static fromArray(array: number[], startingIndex?: number, result?: Cartesian3): Cartesian3;

      static maximumComponent(cartesian: Cartesian3): number;

      static minimumComponent(cartesian: Cartesian3): number;

      static minimumByComponent(first: Cartesian3, second: Cartesian3, result: Cartesian3): Cartesian3;

      static maximumByComponent(first: Cartesian3, second: Cartesian3, result: Cartesian3): Cartesian3;

      static magnitudeSquared(cartesian: Cartesian3): number;

      static magnitude(cartesian: Cartesian3): number;

      static distance(left: Cartesian3, right: Cartesian3): number;

      static distanceSquared(left: Cartesian3, right: Cartesian3): number;

      static normalize(cartesian: Cartesian3, result: Cartesian3): Cartesian3;

      static dot(left: Cartesian3, right: Cartesian3): number;

      static multiplyComponents(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;

      static add(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;

      static subtract(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;

      static multiplyByScalar(cartesian: Cartesian3, scalar: number, result: Cartesian3): Cartesian3;

      static divideByScalar(cartesian: Cartesian3, scalar: number, result: Cartesian3): Cartesian3;

      static negate(cartesian: Cartesian3, result: Cartesian3): Cartesian3;

      static abs(cartesian: Cartesian3, result: Cartesian3): Cartesian3;

      static lerp(start: Cartesian3, end: Cartesian3, t: number, result: Cartesian3): Cartesian3;

      static angleBetween(left: Cartesian3, right: Cartesian3): number;

      static mostOrthogonalAxis(cartesian: Cartesian3, result: Cartesian3): Cartesian3;

      static equals(left?: Cartesian3, right?: Cartesian3): boolean;

      static equalsEpsilon(left: Cartesian3, right: Cartesian3, relativeEpsilon: number, absoluteEpsilon?: number): boolean;

      static cross(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;

      static fromDegrees(longitude: number, latitude: number, height?: number, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3;

      static fromRadians(longitude: number, latitude: number, height?: number, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3;

      static fromDegreesArray(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[];

      static fromRadiansArray(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[];

      static fromDegreesArrayHeights(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[];

      static fromRadiansArrayHeights(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[];

      /**
       * 计算两个笛卡尔坐标系的中点
       * @param left 
       * @param right 
       * @param result 
       */
      static midpoint(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3

      isConstant: boolean;
      definitionChanged: Event;
      referenceFrame: ReferenceFrame;

      getValue(time: JulianDate, result?: Cartesian3): Cartesian3;

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3;

      setInterpolationOptions(options?: { interpolationAlgorithm?: InterpolationAlgorithm; interpolationDegree?: number }): void;
  }

  class Cartesian4 {
      x: number;
      y: number;
      z: number;
      w: number;
      static packedLength: number;
      static ZERO: Cartesian4;
      static UNIT_X: Cartesian4;
      static UNIT_Y: Cartesian4;
      static UNIT_Z: Cartesian4;
      static UNIT_W: Cartesian4;

      constructor(x?: number, y?: number, z?: number, w?: number);

      clone(result?: Cartesian4): Cartesian4;

      equals(right?: Cartesian4): boolean;

      equalsEpsilon(right: Cartesian4, relativeEpsilon: number, absoluteEpsilon?: number): boolean;

      toString(): string;

      static fromElements(x: number, y: number, z: number, w: number, result?: Cartesian4): Cartesian4;

      static fromColor(color: Color, result?: Cartesian4): Cartesian4;

      static clone(cartesian: Cartesian4, result?: Cartesian4): Cartesian4;

      static pack(value: Cartesian4, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Cartesian4): Cartesian4;

      static fromArray(array: number[], startingIndex?: number, result?: Cartesian4): Cartesian4;

      static maximumComponent(cartesian: Cartesian4): number;

      static minimumComponent(cartesian: Cartesian4): number;

      static minimumByComponent(first: Cartesian4, second: Cartesian4, result: Cartesian4): Cartesian4;

      static maximumByComponent(first: Cartesian4, second: Cartesian4, result: Cartesian4): Cartesian4;

      static magnitudeSquared(cartesian: Cartesian4): number;

      static magnitude(cartesian: Cartesian4): number;

      static distance(left: Cartesian4, right: Cartesian4): number;

      static distanceSquared(left: Cartesian4, right: Cartesian4): number;

      static normalize(cartesian: Cartesian4, result: Cartesian4): Cartesian4;

      static dot(left: Cartesian4, right: Cartesian4): number;

      static multiplyComponents(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4;

      static add(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4;

      static subtract(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4;

      static multiplyByScalar(cartesian: Cartesian4, scalar: number, result: Cartesian4): Cartesian4;

      static divideByScalar(cartesian: Cartesian4, scalar: number, result: Cartesian4): Cartesian4;

      static negate(cartesian: Cartesian4, result: Cartesian4): Cartesian4;

      static abs(cartesian: Cartesian4, result: Cartesian4): Cartesian4;

      static lerp(start: Cartesian4, end: Cartesian4, t: number, result: Cartesian4): Cartesian4;

      static mostOrthogonalAxis(cartesian: Cartesian4, result: Cartesian4): Cartesian4;

      static equals(left?: Cartesian4, right?: Cartesian4): boolean;

      static equalsEpsilon(left: Cartesian4, right: Cartesian4, relativeEpsilon: number, absoluteEpsilon?: number): boolean;
  }

  class Cartographic {
      longitude: number;
      latitude: number;
      height: number;
      static ZERO: Cartographic;

      constructor(longitude?: number, latitude?: number, height?: number);

      clone(result?: Cartographic): Cartographic;

      equals(right?: Cartographic): boolean;

      equalsEpsilon(right: Cartographic, epsilon: number): boolean;

      toString(): string;

      static fromRadians(longitude: number, latitude: number, height?: number, result?: Cartographic): Cartographic;

      static fromCartesian(cartesian: Cartesian3, ellipsoid?: Ellipsoid, result?: Cartographic): Cartographic;

      static fromDegrees(longitude: number, latitude: number, height?: number, result?: Cartographic): Cartographic;

      static clone(cartographic: Cartographic, result?: Cartographic): Cartographic;

      static equals(left?: Cartographic, right?: Cartographic): boolean;

      static equalsEpsilon(left: Cartographic, right: Cartographic, epsilon: number): boolean;
  }

  class CartographicGeocoderService implements GeocoderService {
      geocode(query: string): Promise<Array<GeocoderResult>>
  }

  class CatmullRomSpline {
      times: number[];
      points: Cartesian3[];
      firstTangent: Cartesian3;
      lastTangent: Cartesian3;

      constructor(options: { times: number[]; points: Cartesian3[]; firstTangent?: Cartesian3; lastTangent?: Cartesian3 });

      findTimeInterval(time: number): number;

      evaluate(time: number, result?: Cartesian3): Cartesian3;
  }

  class CesiumTerrainProvider extends TerrainProvider {
      errorEvent: Event;
      credit: Credit;
      tilingScheme: GeographicTilingScheme;
      ready: boolean;
      hasWaterMask: boolean;
      hasVertexNormals: boolean;
      requestVertexNormals: boolean;
      requestWaterMask: boolean;

      constructor(options: {
          url: string;
          proxy?: Proxy;
          requestVertexNormals?: boolean;
          requestWaterMask?: boolean;
          ellipsoid?: Ellipsoid;
          credit?: Credit | string;
      });

      requestTileGeometry(x: number, y: number, level: number, request: Request): Promise<TerrainData>;

      getLevelMaximumGeometricError(level: number): number;

      getTileDataAvailable(x: number, y: number, level: number): boolean;
  }

  class Cesium3DTileset {
      readonly url: string;
      show: boolean;
      modelMatrix: Matrix4;
      shadows: ShadowMode;
      maximumScreenSpaceError: number;
      maximumMemoryUsage: number;
      cullWithChildrenBounds: boolean;
      dynamicScreenSpaceError: boolean;
      dynamicScreenSpaceErrorDensity: number;
      dynamicScreenSpaceErrorFactor: number;
      dynamicScreenSpaceErrorHeightFalloff: number;
      skipLevelOfDetail: boolean;
      baseScreenSpaceError: number;
      skipScreenSpaceErrorFactor: number;
      skipLevels: number;
      immediatelyLoadDesiredLevelOfDetail: boolean;
      loadSiblings: boolean;
      debugFreezeFrame: boolean;
      debugColorizeTiles: boolean;
      debugWireframe: boolean;
      debugShowBoundingVolume: boolean;
      debugShowContentBoundingVolume: boolean;
      debugShowViewerRequestVolume: boolean;
      debugShowGeometricError: boolean;
      debugShowRenderingStatistics: boolean;
      debugShowMemoryUsage: boolean;
      debugShowUrl: boolean;
      pointCloudShading: PointCloudShading;
      readonly ready: boolean;
      readonly readyPromise: Promise<Cesium3DTileset>;

      constructor(options: {
          url: string | Resource;
          show?: boolean;
          modelMatrix?: Matrix4;
          shadows?: ShadowMode;
          maximumScreenSpaceError?: number;
          maximumMemoryUsage?: number;
          cullWithChildrenBounds?: boolean;
          dynamicScreenSpaceError?: boolean;
          dynamicScreenSpaceErrorDensity?: number;
          dynamicScreenSpaceErrorFactor?: number;
          dynamicScreenSpaceErrorHeightFalloff?: number;
          skipLevelOfDetail?: boolean;
          baseScreenSpaceError?: number;
          skipScreenSpaceErrorFactor?: number;
          skipLevels?: number;
          immediatelyLoadDesiredLevelOfDetail?: boolean;
          loadSiblings?: boolean;
          debugFreezeFrame?: boolean;
          debugColorizeTiles?: boolean;
          debugWireframe?: boolean;
          debugShowBoundingVolume?: boolean;
          debugShowContentBoundingVolume?: boolean;
          debugShowViewerRequestVolume?: boolean;
          debugShowGeometricError?: boolean;
          debugShowRenderingStatistics?: boolean;
          debugShowMemoryUsage?: boolean;
          debugShowUrl?: boolean;
          pointCloudShading?: PointCloudShadingOptions;
      });
  }

  class Cesium3DTileStyle {
      constructor(style?: string | Object);
  }

  class ShadowMode {
      static CAST_ONLY: number;
      static DISABLED: number;
      static ENABLED: number;
      static RECEIVE_ONLY: number;
  }

  class CircleGeometry {
      static packedLength: number;

      constructor(options: {
          center: Cartesian3;
          radius: number;
          ellipsoid?: Ellipsoid;
          height?: number;
          granularity?: number;
          vertexFormat?: VertexFormat;
          extrudedHeight?: number;
          stRotation?: number
      });

      static createGeometry(circleGeometry: CircleGeometry): Geometry | undefined;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: CircleGeometry): CircleGeometry;
  }

  class CircleOutlineGeometry {
      static packedLength: number;

      constructor(options: {
          center: Cartesian3;
          radius: number;
          ellipsoid?: Ellipsoid;
          height?: number;
          granularity?: number;
          extrudedHeight?: number;
          numberOfVerticalLines?: number
      });

      static createGeometry(circleGeometry: CircleOutlineGeometry): Geometry | undefined;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: CircleOutlineGeometry): CircleOutlineGeometry;
  }

  class ClassificationType {
      static BOTH: number;
      static CESIUM_3D_TILE: number;
      static TERRAIN: number
  }

  class Clock {
      startTime: JulianDate;
      stopTime: JulianDate;
      currentTime: JulianDate;
      multiplier: number;
      clockStep: ClockStep;
      clockRange: ClockRange;
      canAnimate: boolean;
      shouldAnimate: boolean;
      onTick: Event;

      constructor(options: { startTime?: JulianDate; stopTime?: JulianDate; currentTime?: JulianDate; multiplier?: number; clockStep?: ClockStep; clockRange?: ClockRange; canAnimate?: boolean; shouldAnimate?: boolean });

      tick(): JulianDate;
  }

  class Color extends MaterialProperty {
      red: number;
      green: number;
      blue: number;
      alpha: number;
      static packedLength: number;
      static ALICEBLUE: Color;
      static ANTIQUEWHITE: Color;
      static AQUA: Color;
      static AQUAMARINE: Color;
      static AZURE: Color;
      static BEIGE: Color;
      static BISQUE: Color;
      static BLACK: Color;
      static BLANCHEDALMOND: Color;
      static BLUE: Color;
      static BLUEVIOLET: Color;
      static BROWN: Color;
      static BURLYWOOD: Color;
      static CADETBLUE: Color;
      static CHARTREUSE: Color;
      static CHOCOLATE: Color;
      static CORAL: Color;
      static CORNFLOWERBLUE: Color;
      static CORNSILK: Color;
      static CRIMSON: Color;
      static CYAN: Color;
      static DARKBLUE: Color;
      static DARKCYAN: Color;
      static DARKGOLDENROD: Color;
      static DARKGRAY: Color;
      static DARKGREEN: Color;
      static DARKGREY: Color;
      static DARKKHAKI: Color;
      static DARKMAGENTA: Color;
      static DARKOLIVEGREEN: Color;
      static DARKORANGE: Color;
      static DARKORCHID: Color;
      static DARKRED: Color;
      static DARKSALMON: Color;
      static DARKSEAGREEN: Color;
      static DARKSLATEBLUE: Color;
      static DARKSLATEGRAY: Color;
      static DARKSLATEGREY: Color;
      static DARKTURQUOISE: Color;
      static DARKVIOLET: Color;
      static DEEPPINK: Color;
      static DEEPSKYBLUE: Color;
      static DIMGRAY: Color;
      static DIMGREY: Color;
      static DODGERBLUE: Color;
      static FIREBRICK: Color;
      static FLORALWHITE: Color;
      static FORESTGREEN: Color;
      static FUSCHIA: Color;
      static GAINSBORO: Color;
      static GHOSTWHITE: Color;
      static GOLD: Color;
      static GOLDENROD: Color;
      static GRAY: Color;
      static GREEN: Color;
      static GREENYELLOW: Color;
      static GREY: Color;
      static HONEYDEW: Color;
      static HOTPINK: Color;
      static INDIANRED: Color;
      static INDIGO: Color;
      static IVORY: Color;
      static KHAKI: Color;
      static LAVENDER: Color;
      static LAVENDAR_BLUSH: Color;
      static LAWNGREEN: Color;
      static LEMONCHIFFON: Color;
      static LIGHTBLUE: Color;
      static LIGHTCORAL: Color;
      static LIGHTCYAN: Color;
      static LIGHTGOLDENRODYELLOW: Color;
      static LIGHTGRAY: Color;
      static LIGHTGREEN: Color;
      static LIGHTGREY: Color;
      static LIGHTPINK: Color;
      static LIGHTSEAGREEN: Color;
      static LIGHTSKYBLUE: Color;
      static LIGHTSLATEGRAY: Color;
      static LIGHTSLATEGREY: Color;
      static LIGHTSTEELBLUE: Color;
      static LIGHTYELLOW: Color;
      static LIME: Color;
      static LIMEGREEN: Color;
      static LINEN: Color;
      static MAGENTA: Color;
      static MAROON: Color;
      static MEDIUMAQUAMARINE: Color;
      static MEDIUMBLUE: Color;
      static MEDIUMORCHID: Color;
      static MEDIUMPURPLE: Color;
      static MEDIUMSEAGREEN: Color;
      static MEDIUMSLATEBLUE: Color;
      static MEDIUMSPRINGGREEN: Color;
      static MEDIUMTURQUOISE: Color;
      static MEDIUMVIOLETRED: Color;
      static MIDNIGHTBLUE: Color;
      static MINTCREAM: Color;
      static MISTYROSE: Color;
      static MOCCASIN: Color;
      static NAVAJOWHITE: Color;
      static NAVY: Color;
      static OLDLACE: Color;
      static OLIVE: Color;
      static OLIVEDRAB: Color;
      static ORANGE: Color;
      static ORANGERED: Color;
      static ORCHID: Color;
      static PALEGOLDENROD: Color;
      static PALEGREEN: Color;
      static PALETURQUOISE: Color;
      static PALEVIOLETRED: Color;
      static PAPAYAWHIP: Color;
      static PEACHPUFF: Color;
      static PERU: Color;
      static PINK: Color;
      static PLUM: Color;
      static POWDERBLUE: Color;
      static PURPLE: Color;
      static RED: Color;
      static ROSYBROWN: Color;
      static ROYALBLUE: Color;
      static SADDLEBROWN: Color;
      static SALMON: Color;
      static SANDYBROWN: Color;
      static SEAGREEN: Color;
      static SEASHELL: Color;
      static SIENNA: Color;
      static SILVER: Color;
      static SKYBLUE: Color;
      static SLATEBLUE: Color;
      static SLATEGRAY: Color;
      static SLATEGREY: Color;
      static SNOW: Color;
      static SPRINGGREEN: Color;
      static STEELBLUE: Color;
      static TAN: Color;
      static TEAL: Color;
      static THISTLE: Color;
      static TOMATO: Color;
      static TURQUOISE: Color;
      static VIOLET: Color;
      static WHEAT: Color;
      static WHITE: Color;
      static WHITESMOKE: Color;
      static YELLOW: Color;
      static YELLOWGREEN: Color;
      static TRANSPARENT: Color;

      constructor(red?: number, green?: number, blue?: number, alpha?: number);

      clone(result?: Color): Color;

      equals(other: Color): boolean;

      equalsEpsilon(other: Color, epsilon?: number): boolean;

      toString(): string;

      toCssColorString(): string;

      toBytes(result?: number[]): number[];

      toRgba(): number;

      brighten(magnitude: number, result: Color): Color;

      darken(magnitude: number, result: Color): Color;

      withAlpha(alpha: number, result?: Color): Color;

      static fromCartesian4(cartesian: Cartesian4, result?: Color): Color;

      static fromBytes(red?: number, green?: number, blue?: number, alpha?: number, result?: Color): Color;

      static fromAlpha(color: Color, alpha: number, result?: Color): Color;

      static fromRgba(rgba: number): Color;

      static fromHsl(hue?: number, saturation?: number, lightness?: number, alpha?: number): Color;

      static fromRandom(options?: { red?: number; minimumRed?: number; maximumRed?: number; green?: number; minimumGreen?: number; maximumGreen?: number; blue?: number; minimumBlue?: number; maximumBlue?: number; alpha?: number; minimumAlpha?: number; maximumAlpha?: number }, result?: Color): Color;

      static fromCssColorString(color: string): Color;

      static pack(value: Color, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Color): Color;

      static byteToFloat(number: number): number;

      static floatToByte(number: number): number;

      static clone(color: Color, result?: Color): Color;

      static equals(left: Color, right: Color): boolean;
  }

  class ColorGeometryInstanceAttribute {
      value: Uint8Array;
      componentDatatype: ComponentDatatype;
      componentsPerAttribute: number;
      normalize: boolean;

      constructor(red?: number, green?: number, blue?: number, alpha?: number);

      static fromColor(color: Color): ColorGeometryInstanceAttribute;

      static toValue(color: Color, result?: Uint8Array): Uint8Array;
  }

  class CorridorGeometry {
      packedLength: number;

      constructor(options: { positions: Cartesian3[]; width: number; ellipsoid?: Ellipsoid; granularity?: number; height?: number; extrudedHeight?: number; vertexFormat?: VertexFormat; cornerType?: CornerType });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: CorridorGeometry): CorridorGeometry;

      static createGeometry(corridorGeometry: CorridorGeometry): Geometry | undefined;
  }

  class CorridorOutlineGeometry {
      packedLength: number;

      constructor(options: { positions: Cartesian3[]; width: number; ellipsoid?: Ellipsoid; granularity?: number; height?: number; extrudedHeight?: number; cornerType?: CornerType });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: CorridorOutlineGeometry): CorridorOutlineGeometry;

      static createGeometry(corridorOutlineGeometry: CorridorOutlineGeometry): Geometry | undefined;
  }

  class Credit {
      text: string;
      imageUrl: string;
      link: string;

      constructor(text?: string, imageUrl?: string, link?: string);

      hasImage(): boolean;

      hasLink(): boolean;

      equals(credits: Credit): boolean;
      static equals(left: Credit, right: Credit): boolean;
  }

  class CylinderGeometry {
      static packedLength: number;

      constructor(options: { length: number; topRadius: number; bottomRadius: number; slices?: number; vertexFormat?: VertexFormat });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: CylinderGeometry): CylinderGeometry;

      static createGeometry(cylinderGeometry: CylinderGeometry): Geometry | undefined;
  }

  class CylinderOutlineGeometry {
      static packedLength: number;

      constructor(options: { length: number; topRadius: number; bottomRadius: number; slices?: number; numberOfVerticalLines?: number });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: CylinderOutlineGeometry): CylinderOutlineGeometry;

      static createGeometry(cylinderGeometry: CylinderOutlineGeometry): Geometry | undefined;
  }

  class DefaultProxy {
      constructor(proxy: string);

      getURL(resource: string): string;
  }

  class DeveloperError {
      name: string;
      message: string;
      stack: string;

      constructor(message?: string);
  }

  class DistanceDisplayCondition {
      near: number;
      far: number;

      constructor(near?: number, far?: number);

      clone(result?: DistanceDisplayCondition): DistanceDisplayCondition;

      equals(other: DistanceDisplayCondition): boolean;

      static clone(value?: DistanceDisplayCondition, result?: DistanceDisplayCondition): DistanceDisplayCondition;

      static equals(left: DistanceDisplayCondition, right: DistanceDisplayCondition): boolean;
  }

  class EllipseGeometry {
      static packedLength: number;

      constructor(options: {
          center: Cartesian3;
          semiMajorAxis: number;
          semiMinorAxis: number;
          ellipsoid?: Ellipsoid;
          height?: number;
          extrudedHeight?: number;
          rotation?: number;
          stRotation?: number;
          granularity?: number;
          vertexFormat?: VertexFormat
      });

      static createGeometry(ellipseGeometry: EllipseGeometry): Geometry | undefined;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: EllipseGeometry): EllipseGeometry;
  }

  class EllipseOutlineGeometry {
      static packedLength: number;

      constructor(options: { center: Cartesian3; semiMajorAxis: number; semiMinorAxis: number; ellipsoid?: Ellipsoid; height?: number; extrudedHeight?: number; rotation?: number; granularity?: number; numberOfVerticalLines?: number });

      static createGeometry(ellipseGeometry: EllipseOutlineGeometry): Geometry | undefined;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: EllipseOutlineGeometry): EllipseOutlineGeometry;
  }

  class Ellipsoid {
      static MOON: Ellipsoid;
      static packedLength: number;
      static UNIT_SPHERE: Ellipsoid;
      static WGS84: Ellipsoid;
      minimumRadius: number;
      maximumRadius: number;
      oneOverRadii: Cartesian3;
      oneOverRadiiSquared: Cartesian3;
      radii: Cartesian3;
      radiiSquared: Cartesian3;
      radiiToTheFourth: Cartesian3;

      constructor(x?: number, y?: number, z?: number);

      static clone(ellipsoid: Ellipsoid, result?: Ellipsoid): Ellipsoid;

      static fromCartesian3(radii?: Cartesian3): Ellipsoid;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Ellipsoid): Ellipsoid;

      cartesianArrayToCartographicArray(cartesians: Cartesian3[], result?: Cartographic[]): Cartographic[];

      cartesianToCartographic(cartesian: Cartesian3, result?: Cartographic): Cartographic;

      cartographicArrayToCartesianArray(cartographics: Cartographic[], result?: Cartesian3[]): Cartesian3[];

      cartographicToCartesian(cartographic: Cartographic, result?: Cartesian3): Cartesian3;

      clone(result?: Ellipsoid): Ellipsoid;

      equals(right?: Ellipsoid): boolean;

      geocentricSurfaceNormal(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      geodeticSurfaceNormalCartographic(cartographic: Cartographic, result?: Cartesian3): Cartesian3;

      geodeticSurfaceNormal(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      scaleToGeodeticSurface(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      scaleToGeocentricSurface(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      transformPositionToScaledSpace(position: Cartesian3, result?: Cartesian3): Cartesian3;

      transformPositionFromScaledSpace(position: Cartesian3, result?: Cartesian3): Cartesian3;

      getSurfaceNormalIntersectionWithZAxis(position: Cartesian3, buffer: number, result: Cartesian3): Cartesian3;

      toString(): string;
  }

  class EllipsoidGeodesic {
      surfaceDistance: number;
      start: Cartographic;
      end: Cartographic;
      startHeading: number;
      endHeading: number;

      constructor(start?: Cartographic, end?: Cartographic, ellipsoid?: Ellipsoid);

      setEndPoints(start: Cartographic, end: Cartographic): void;

      interpolateUsingFraction(fraction: number): Cartographic;

      interpolateUsingSurfaceDistance(distance: number): Cartographic;
  }

  class EllipsoidGeometry {
      static packedLength: number;

      constructor(options?: { radii?: Cartesian3; stackPartitions?: number; slicePartitions?: number; vertexFormat?: VertexFormat });

      static createGeometry(ellipsoidGeometry: EllipsoidGeometry): Geometry | undefined;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: EllipsoidGeometry): EllipsoidGeometry;
  }

  class EllipsoidOutlineGeometry {
      static packedLength: number;

      constructor(options?: { radii?: Cartesian3; stackPartitions?: number; slicePartitions?: number; subdivisions?: number });

      static createGeometry(ellipsoidGeometry: EllipsoidOutlineGeometry): Geometry | undefined;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: EllipsoidOutlineGeometry): EllipsoidOutlineGeometry;
  }

  class EllipsoidTangentPlane {
      ellipsoid: Ellipsoid;
      origin: Cartesian3;

      constructor(ellipsoid: Ellipsoid, origin: Cartesian3);

      projectPointOntoPlane(cartesian: Cartesian3, result?: Cartesian2): Cartesian2;

      projectPointsOntoPlane(cartesians: Cartesian3[], result?: Cartesian2[]): Cartesian2[];

      projectPointsOntoEllipsoid(cartesians: Cartesian2[], result?: Cartesian3[]): Cartesian3[];

      static fromPoints(ellipsoid: Ellipsoid, cartesians: Cartesian3): EllipsoidTangentPlane;
  }

  class EllipsoidTerrainProvider extends TerrainProvider {
      credit: Credit;
      errorEvent: Event;
      hasWaterMask: boolean;
      hasVertexNormals: boolean;
      ready: boolean;
      readonly readyPromise: Promise<boolean>
      tilingScheme: GeographicTilingScheme;

      constructor(options?: { tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid });

      getLevelMaximumGeometricError(level: number): number;

      getTileDataAvailable(x: number, y: number, level: number): boolean;

      requestTileGeometry(x: number, y: number, level: number, request: Request): Promise<TerrainData>;
  }

  class Event {
      numberOfListeners: number;

      addEventListener(listener: Function, scope?: any): Event.RemoveCallback;

      removeEventListener(listener: Function, scope?: any): boolean;

      raiseEvent(...args: any[]): void;
  }

  module Event {
      type RemoveCallback = () => void;
  }

  class EventHelper {
      add(event: Event, listener: Function, scope?: any): EventHelper.RemoveCallback;

      removeAll(): void;
  }

  module EventHelper {
      type RemoveCallback = () => void;
  }

  class GeographicProjection {
      ellipsoid: Ellipsoid;

      constructor(ellipsoid?: Ellipsoid);

      project(cartographic: Cartographic, result?: Cartesian3): Cartesian3;

      unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic;
  }

  class GeographicTilingScheme {
      ellipsoid: Ellipsoid;
      rectangle: Rectangle;
      projection: MapProjection;

      constructor(options?: { ellipsoid?: Ellipsoid; rectangle?: Rectangle; numberOfLevelZeroTilesX?: number; numberOfLevelZeroTilesY?: number });

      getNumberOfXTilesAtLevel(level: number): number;

      getNumberOfYTilesAtLevel(level: number): number;

      rectangleToNativeRectangle(rectangle: Rectangle, result?: Rectangle): Rectangle;

      tileXYToNativeRectangle(x: number, y: number, level: number, result?: any): Rectangle;

      tileXYToRectangle(x: number, y: number, level: number, result?: any): Rectangle;

      positionToTileXY(position: Cartographic, level: number, result?: Cartesian2): Cartesian2;
  }

  class Geometry {
      attributes: GeometryAttributes;
      boundingSphere: BoundingSphere;
      indices: any[];
      primitiveType: PrimitiveType;

      constructor(options: {
          attributes: GeometryAttributes;
          primitiveType?: PrimitiveType;
          indices?: Uint16Array | Uint32Array;
          boundingSphere?: BoundingSphere
      });

      static computeNumberOfVertices(geometry: Cartesian3): number;
  }

  class GeometryAttribute {
      componentDatatype: ComponentDatatype;
      componentsPerAttribute: number;
      normalize: boolean;
      values: any[];

      constructor(options?: { componentDatatype?: ComponentDatatype; componentsPerAttribute?: number; normalize?: boolean; values?: number[] });
  }

  class GeometryAttributes {
      bitangent: GeometryAttribute;
      color: GeometryAttribute;
      normal: GeometryAttribute;
      position: GeometryAttribute;
      st: GeometryAttribute;
      tangent: GeometryAttribute;
  }

  class GeometryInstance {
      geometry: Geometry;
      modelMatrix: Matrix4;
      id: any;
      attributes: any;

      constructor(options: { geometry: Geometry | any; modelMatrix?: Matrix4; id?: any; attributes?: any });
  }

  class GeometryInstanceAttribute {
      componentDatatype: ComponentDatatype;
      componentsPerAttribute: number;
      normalize: boolean;
      value: number[];

      constructor(options: { componentDatatype?: ComponentDatatype; componentsPerAttribute?: number; normalize?: boolean; value?: number[] });
  }

  class GregorianDate {
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      second: number;
      millisecond: number;
      isLeapSecond: boolean;
  }

  class HeightmapTerrainData {
      waterMask: Uint8Array | HTMLImageElement | HTMLCanvasElement;

      constructor(options: { buffer: Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Float64Array; width: number; height: number; childTileMask?: number; structure?: any; structureheightScale?: number; structureheightOffset?: number; structureelementsPerHeight?: number; structurestride?: number; structureelementMultiplier?: number; structureisBigEndian?: boolean; createdByUpsampling?: boolean });

      createMesh(tilingScheme: TilingScheme, x: number, y: number, level: number): Promise<TerrainMesh>;

      interpolateHeight(rectangle: Rectangle, longitude: number, latitude: number): number;

      upsample(tilingScheme: TilingScheme, thisX: number, thisY: number, thisLevel: number, descendantX: number, descendantY: number, descendantLevel: number): Promise<HeightmapTerrainData>;

      isChildAvailable(thisX: number, thisY: number, childX: number, childY: number): boolean;

      wasCreatedByUpsampling(): boolean;
  }

  class HermiteSpline {
      times: number[];
      points: Cartesian3[];
      inTangents: Cartesian3[];
      outTangents: Cartesian3[];

      constructor(options: { times: number[]; points: Cartesian3[]; inTangents: Cartesian3[]; outTangents: Cartesian3[] });

      findTimeInterval(time: number): number;

      evaluate(time: number, result?: Cartesian3): Cartesian3;

      static createC1(): HermiteSpline;

      static createNaturalCubic(): HermiteSpline | LinearSpline;

      static createClampedCubic(): HermiteSpline | LinearSpline;
  }

  class Interval {
      start: number;
      stop: number;

      constructor(start?: number, stop?: number);
  }

  class JulianDate {
      dayNumber: number;
      secondsOfDay: number;
      static leapSeconds: LeapSecond[];

      constructor(julianDayNumber: number, secondsOfDay: number, timeStandard?: TimeStandard);

      clone(result?: JulianDate): JulianDate;

      equals(right?: JulianDate): boolean;

      equalsEpsilon(right: JulianDate, epsilon: number): boolean;

      toString(): string;

      static fromDate(date: Date, result?: JulianDate): JulianDate;

      static fromIso8601(iso8601String: string, result?: JulianDate): JulianDate;

      static now(result?: JulianDate): JulianDate;

      static toGregorianDate(julianDate: JulianDate, result?: GregorianDate): GregorianDate;

      static toDate(julianDate: JulianDate): Date;

      static toIso8601(julianDate: JulianDate, precision?: number): string;

      static clone(julianDate: JulianDate, result?: JulianDate): JulianDate;

      static compare(left: JulianDate, right: JulianDate): number;

      static equals(left?: JulianDate, right?: JulianDate): boolean;

      static equalsEpsilon(left: JulianDate, right: JulianDate, epsilon: number): boolean;

      static totalDays(julianDate: JulianDate): number;

      static secondsDifference(left: JulianDate, right: JulianDate): number;

      static daysDifference(left: JulianDate, right: JulianDate): number;

      static computeTaiMinusUtc(julianDate: JulianDate): number;

      static addSeconds(julianDate: JulianDate, seconds: number, result: JulianDate): JulianDate;

      static addMinutes(julianDate: JulianDate, minutes: number, result: JulianDate): JulianDate;

      static addHours(julianDate: JulianDate, hours: number, result: JulianDate): JulianDate;

      static addDays(julianDate: JulianDate, days: number, result: JulianDate): JulianDate;

      static lessThan(left: JulianDate, right: JulianDate): boolean;

      static lessThanOrEquals(left: JulianDate, right: JulianDate): boolean;

      static greaterThan(left: JulianDate, right: JulianDate): boolean;

      static greaterThanOrEquals(left: JulianDate, right: JulianDate): boolean;
  }

  class LeapSecond {
      julianDate: JulianDate;
      offset: number;

      constructor(date?: JulianDate, offset?: number);
  }

  class LinearSpline {
      times: number[];
      points: Cartesian3[];

      constructor();

      findTimeInterval(time: number): number;

      evaluate(time: number, result?: Cartesian3): Cartesian3;
  }

  class MapProjection {
      ellipsoid: Ellipsoid;

      project(cartographic: Cartographic, result?: Cartesian3): Cartesian3;

      unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic;
  }

  class Matrix2 {
      static packedLength: number;
      static IDENTITY: Matrix2;
      static COLUMN0ROW0: number;
      static COLUMN0ROW1: number;
      static COLUMN1ROW0: number;
      static COLUMN1ROW1: number;

      constructor(column0Row0?: number, column1Row0?: number, column0Row1?: number, column1Row1?: number);

      clone(result?: Matrix2): Matrix2;

      equals(right?: Matrix2): boolean;

      equalsEpsilon(right: Matrix2, epsilon: number): boolean;

      toString(): string;

      static pack(value: Matrix2, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Matrix2): Matrix2;

      static clone(matrix: Matrix2, result?: Matrix2): Matrix2;

      static fromArray(array: number[], startingIndex?: number, result?: Matrix2): Matrix2;

      static fromColumnMajorArray(values: number[], result?: Matrix2): Matrix2;

      static fromRowMajorArray(values: number[], result?: Matrix2): Matrix2;

      static fromScale(scale: Cartesian2, result?: Matrix2): Matrix2;

      static fromUniformScale(scale: number, result?: Matrix2): Matrix2;

      static fromRotation(angle: number, result?: Matrix2): Matrix2;

      static toArray(matrix: Matrix2, result?: number[]): number[];

      static getElementIndex(row: number, column: number): number;

      static getColumn(matrix: Matrix2, index: number, result: Cartesian2): Cartesian2;

      static setColumn(matrix: Matrix2, index: number, cartesian: Cartesian2, result: Cartesian2): Matrix2;

      static getRow(matrix: Matrix2, index: number, result: Cartesian2): Cartesian2;

      static setRow(matrix: Matrix2, index: number, cartesian: Cartesian2, result: Matrix2): Matrix2;

      static getScale(matrix: Matrix2, result: Cartesian2): Cartesian2;

      static getMaximumScale(matrix: Matrix2): number;

      static multiply(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2;

      static add(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2;

      static subtract(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2;

      static multiplyByVector(matrix: Matrix2, cartesian: Cartesian2, result: Cartesian2): Cartesian2;

      static multiplyByScalar(matrix: Matrix2, scalar: number, result: Matrix2): Matrix2;

      static negate(matrix: Matrix2, result: Matrix2): Matrix2;

      static transpose(matrix: Matrix2, result: Matrix2): Matrix2;

      static abs(matrix: Matrix2, result: Matrix2): Matrix2;

      static equals(left?: Matrix2, right?: Matrix2): boolean;

      static equalsEpsilon(left: Matrix2, right: Matrix2, epsilon: number): boolean;
  }

  class Matrix3 {
      static packedLength: number;
      static IDENTITY: Matrix3;
      static COLUMN0ROW0: number;
      static COLUMN0ROW1: number;
      static COLUMN0ROW2: number;
      static COLUMN1ROW0: number;
      static COLUMN1ROW1: number;
      static COLUMN1ROW2: number;
      static COLUMN2ROW0: number;
      static COLUMN2ROW1: number;
      static COLUMN2ROW2: number;

      constructor(column0Row0?: number, column1Row0?: number, column2Row0?: number, column0Row1?: number, column1Row1?: number, column2Row1?: number, column0Row2?: number, column1Row2?: number, column2Row2?: number);

      clone(result?: Matrix3): Matrix3;

      equals(right?: Matrix3): boolean;

      equalsEpsilon(right: Matrix3, epsilon: number): boolean;

      toString(): string;

      static pack(value: Matrix3, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Matrix3): Matrix3;

      static clone(matrix: Matrix3, result?: Matrix3): Matrix3;

      static fromArray(array: number[], startingIndex?: number, result?: Matrix3): Matrix3;

      static fromColumnMajorArray(values: number[], result?: Matrix3): Matrix3;

      static fromRowMajorArray(values: number[], result?: Matrix3): Matrix3;

      static fromQuaternion(quaternion: Quaternion): Matrix3;

      static fromScale(scale: Cartesian3, result?: Matrix3): Matrix3;

      static fromUniformScale(scale: number, result?: Matrix3): Matrix3;

      static fromCrossProduct(the: Cartesian3, result?: Matrix3): Matrix3;

      static fromRotationX(angle: number, result?: Matrix3): Matrix3;

      static fromRotationY(angle: number, result?: Matrix3): Matrix3;

      static fromRotationZ(angle: number, result?: Matrix3): Matrix3;

      static toArray(matrix: Matrix3, result?: number[]): number[];

      static getElementIndex(row: number, column: number): number;

      static getColumn(matrix: Matrix3, index: number, result: Cartesian3): Cartesian3;

      static setColumn(matrix: Matrix3, index: number, cartesian: Cartesian3, result: Cartesian3): Matrix3;

      static getRow(matrix: Matrix3, index: number, result: Cartesian3): Cartesian3;

      static setRow(matrix: Matrix3, index: number, cartesian: Cartesian3, result: Cartesian3): Matrix3;

      static getScale(matrix: Matrix3, result: Cartesian3): Cartesian3;

      static getMaximumScale(matrix: Matrix3): number;

      static multiply(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3;

      static add(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3;

      static subtract(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3;

      static multiplyByVector(matrix: Matrix3, cartesian: Cartesian3, result: Cartesian3): Cartesian3;

      static multiplyByScalar(matrix: Matrix3, scalar: number, result: Matrix3): Matrix3;

      static negate(matrix: Matrix3, result: Matrix3): Matrix3;

      static transpose(matrix: Matrix3, result: Matrix3): Matrix3;

      static computeEigenDecomposition(matrix: Matrix3, result?: any): any;

      static abs(matrix: Matrix3, result: Matrix3): Matrix3;

      static determinant(matrix: Matrix3): number;

      static inverse(matrix: Matrix3, result: Matrix3): Matrix3;

      static equals(left?: Matrix3, right?: Matrix3): boolean;

      static equalsEpsilon(left: Matrix3, right: Matrix3, epsilon: number): boolean;
  }

  class Matrix4 {
      static packedLength: number;
      static IDENTITY: Matrix4;
      static COLUMN0ROW0: number;
      static COLUMN0ROW1: number;
      static COLUMN0ROW2: number;
      static COLUMN0ROW3: number;
      static COLUMN1ROW0: number;
      static COLUMN1ROW1: number;
      static COLUMN1ROW2: number;
      static COLUMN1ROW3: number;
      static COLUMN2ROW0: number;
      static COLUMN2ROW1: number;
      static COLUMN2ROW2: number;
      static COLUMN2ROW3: number;
      static COLUMN3ROW0: number;
      static COLUMN3ROW1: number;
      static COLUMN3ROW2: number;
      static COLUMN3ROW3: number;

      constructor(column0Row0?: number, column1Row0?: number, column2Row0?: number, column3Row0?: number, column0Row1?: number, column1Row1?: number, column2Row1?: number, column3Row1?: number, column0Row2?: number, column1Row2?: number, column2Row2?: number, column3Row2?: number, column0Row3?: number, column1Row3?: number, column2Row3?: number, column3Row3?: number);

      clone(result?: Matrix4): Matrix4;

      equals(right?: Matrix4): boolean;

      equalsEpsilon(right: Matrix4, epsilon: number): boolean;

      toString(): string;

      static pack(value: Matrix4, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Matrix4): Matrix4;

      static clone(matrix: Matrix4, result?: Matrix4): Matrix4;

      static fromArray(array: number[], startingIndex?: number, result?: Matrix4): Matrix4;

      static fromColumnMajorArray(values: number[], result?: Matrix4): Matrix4;

      static fromRowMajorArray(values: number[], result?: Matrix4): Matrix4;

      static fromRotationTranslation(rotation: Matrix3, translation?: Cartesian3, result?: Matrix4): Matrix4;

      static fromTranslationQuaternionRotationScale(translation: Cartesian3, rotation: Quaternion, scale: Cartesian3, result?: Matrix4): Matrix4;

      static fromTranslation(translation: Cartesian3, result?: Matrix4): Matrix4;

      static fromScale(scale: Cartesian3, result?: Matrix4): Matrix4;

      static fromUniformScale(scale: number, result?: Matrix4): Matrix4;

      static fromCamera(camera: Camera, result?: Matrix4): Matrix4;

      static computePerspectiveFieldOfView(fovY: number, aspectRatio: number, near: number, far: number, result: Matrix4): Matrix4;

      static computeOrthographicOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result: Matrix4): Matrix4;

      static computePerspectiveOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result: Matrix4): Matrix4;

      static computeInfinitePerspectiveOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result: Matrix4): Matrix4;

      static computeViewportTransformation(viewport: any, nearDepthRange: number, farDepthRange: number, result: Matrix4): Matrix4;

      static toArray(matrix: Matrix4, result?: number[]): number[];

      static getElementIndex(row: number, column: number): number;

      static getColumn(matrix: Matrix4, index: number, result: Cartesian4): Cartesian4;

      static setColumn(matrix: Matrix4, index: number, cartesian: Cartesian4, result: Cartesian4): Matrix4;

      static getRow(matrix: Matrix4, index: number, result: Cartesian4): Cartesian4;

      static setRow(matrix: Matrix4, index: number, cartesian: Cartesian4, result: Cartesian4): Matrix4;

      static getScale(matrix: Matrix4, result: Cartesian3): Cartesian3;

      static getMaximumScale(matrix: Matrix4): number;

      static multiply(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4;

      static add(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4;

      static subtract(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4;

      static multiplyTransformation(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4;

      static multiplyByMatrix3(matrix: Matrix4, rotation: Matrix3, result: Matrix4): Matrix4;

      static multiplyByTranslation(matrix: Matrix4, translation: Cartesian3, result: Matrix4): Matrix4;

      static multiplyByUniformScale(matrix: Matrix4, scale: number, result: Matrix4): Matrix4;

      static multiplyByScale(matrix: Matrix4, scale: Cartesian3, result: Matrix4): Matrix4;

      static multiplyByVector(matrix: Matrix4, cartesian: Cartesian4, result: Cartesian4): Cartesian4;

      static multiplyByPointAsVector(matrix: Matrix4, cartesian: Cartesian3, result: Cartesian3): Cartesian3;

      static multiplyByPoint(matrix: Matrix4, cartesian: Cartesian3, result: Cartesian3): Cartesian3;

      static multiplyByScalar(matrix: Matrix4, scalar: number, result: Matrix4): Matrix4;

      static negate(matrix: Matrix4, result: Matrix4): Matrix4;

      static transpose(matrix: Matrix4, result: Matrix4): Matrix4;

      static abs(matrix: Matrix4, result: Matrix4): Matrix4;

      static equals(left?: Matrix4, right?: Matrix4): boolean;

      static equalsEpsilon(left: Matrix4, right: Matrix4, epsilon: number): boolean;

      static getTranslation(matrix: Matrix4, result: Cartesian3): Cartesian3;

      static getRotation(matrix: Matrix4, result: Matrix3): Matrix3;

      static inverse(matrix: Matrix4, result: Matrix4): Matrix4;

      static inverseTransformation(matrix: Matrix4, result: Matrix4): Matrix4;
  }

  class NearFarScalar {
      near: number;
      nearValue: number;
      far: number;
      farValue: number;
      static packedLength: number;

      constructor(near?: number, nearValue?: number, far?: number, farValue?: number);

      clone(result?: NearFarScalar): NearFarScalar;

      equals(right?: NearFarScalar): boolean;

      static clone(nearFarScalar: NearFarScalar, result?: NearFarScalar): NearFarScalar;

      static pack(value: NearFarScalar, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: NearFarScalar): NearFarScalar;

      static equals(left?: NearFarScalar, right?: NearFarScalar): boolean;
  }

  class ObjectOrientedBoundingBox {
      rotation: Matrix3;
      translation: Cartesian3;
      scale: Cartesian3;

      constructor(rotation?: Matrix3, translation?: Cartesian3, scale?: Cartesian3);

      clone(result?: ObjectOrientedBoundingBox): ObjectOrientedBoundingBox;

      equals(right?: ObjectOrientedBoundingBox): boolean;

      static fromPoints(positions: Cartesian3[], result?: ObjectOrientedBoundingBox): ObjectOrientedBoundingBox;

      static fromBoundingRectangle(boundingRectangle: BoundingRectangle, rotation?: number): ObjectOrientedBoundingBox;

      static clone(box: ObjectOrientedBoundingBox, result?: ObjectOrientedBoundingBox): ObjectOrientedBoundingBox;

      static intersect(left: ObjectOrientedBoundingBox, right: ObjectOrientedBoundingBox): boolean;

      static equals(left: ObjectOrientedBoundingBox, right: ObjectOrientedBoundingBox): boolean;
  }

  class Occluder {
      cameraPosition: Cartesian3;
      position: Cartesian3;
      radius: number;

      constructor(occluderBoundingSphere: BoundingSphere, cameraPosition: Cartesian3);

      static computeOccludeePoint(occluderBoundingSphere: BoundingSphere, occludeePosition: Cartesian3, positions: Cartesian3[]): any;

      static computeOccludeePointFromRectangle(rectangle: Rectangle, ellipsoid?: Ellipsoid): any;

      static fromBoundingSphere(occluderBoundingSphere: BoundingSphere, cameraPosition: Cartesian3, result?: Occluder): Occluder;

      computeVisibility(occludeeBS: BoundingSphere): number;

      isBoundingSphereVisible(occludee: BoundingSphere): boolean;

      isPointVisible(occludee: Cartesian3): boolean;
  }

  class PinBuilder {
      fromColor(color: Color, size: number): HTMLCanvasElement;

      fromUrl(url: string, color: Color, size: number): HTMLCanvasElement | Promise<HTMLCanvasElement>;

      fromMakiIconId(id: string, color: Color, size: number): HTMLCanvasElement | Promise<HTMLCanvasElement>;

      fromText(text: string, color: Color, size: number): HTMLCanvasElement;
  }

  class Plane {
      static ORIGIN_XY_PLANE: Plane;
      static ORIGIN_YZ_PLANE: Plane;
      static ORIGIN_ZX_PLANE: Plane;
      distance: number;
      normal: Cartesian3;

      constructor(normal: Cartesian3, distance: number);

      static fromCartesian4(coefficients: Cartesian4, result: Plane): Plane;

      static fromPointNormal(point: Cartesian3, normal: Cartesian3, result?: Plane): Plane;

      static getPointDistance(plane: Plane, point: Cartesian3): number;
  }

  type PointCloudShadingOptions = Partial<{
      attenuation: boolean;
      geometricErrorScale: number;
      maximumAttenuation: number;
      baseResolution: number;
      eyeDomeLighting: boolean;
      eyeDomeLightingStrength: number;
      eyeDomeLightingRadius: number;
  }>;

  class PointCloudShading {

      attenuation: boolean;
      baseResolution: number;
      eyeDomeLighting: boolean;
      eyeDomeLightingRadius: number;
      eyeDomeLightingStrength: number;
      geometricErrorScale: number;
      maximumAttenuation: number;

      constructor(options: PointCloudShadingOptions);

      static isSupported(scene: Scene): boolean;
  }

  class PolygonGeometry {
      packedLength: number;

      constructor(options: {
          polygonHierarchy: PolygonHierarchy;
          height?: number;
          extrudedHeight?: number;
          vertexFormat?: VertexFormat;
          stRotation?: number;
          ellipsoid?: Ellipsoid;
          granularity?: number;
          perPositionHeight?: boolean;
          closeTop?: boolean;
          closeBottom?: boolean;
      });

      static createGeometry(polygonGeometry: PolygonGeometry): Geometry | undefined;

      static fromPositions(options: PolygonGeometryOptions): PolygonGeometry;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: PolygonGeometry): PolygonGeometry;
  }

  type PolygonGeometryOptions = PolygonOutlineGeometryOptions & {
      closeBottom?: boolean;
      closeTop?: boolean;
      stRotation?: number;
  };

  class PolygonHierarchy extends Property {
      positions: Cartesian3[];
      holes: PolygonHierarchy[];

      constructor(positions?: Cartesian3[], holes?: PolygonHierarchy[]);
  }

  class PolygonOutlineGeometry {
      constructor(options: { polygonHierarchy: any; height?: number; extrudedHeight?: number; vertexFormat?: VertexFormat; ellipsoid?: Ellipsoid; granularity?: number; perPositionHeight?: boolean });

      packedLength: number;

      static createGeometry(polygonGeometry: PolygonOutlineGeometry): Geometry | undefined;

      static fromPositions(options: PolygonOutlineGeometryOptions): PolygonOutlineGeometry;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: PolygonOutlineGeometry): PolygonOutlineGeometry;
  }

  type PolygonOutlineGeometryOptions = {
      polygonHierarchy: PolygonHierarchy;
      ellipsoid?: Ellipsoid;
      extrudedHeight?: number;
      granularity?: number;
      height?: number;
      perPositionHeight?: boolean;
      vertexFormat?: VertexFormat;
  };

  class PolylineGeometry {
      packedLength: number;

      constructor(options: { positions: Cartesian3[]; width?: number; colors?: Color[]; colorsPerVertex?: boolean; followSurface?: boolean; granularity?: number; ellipsoid?: Ellipsoid });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: PolylineGeometry): PolylineGeometry;

      static createGeometry(polylineGeometry: PolylineGeometry): Geometry | undefined;
  }

  class PolylineVolumeGeometry {
      packedLength: number;

      constructor(options: { polylinePositions: Cartesian3[]; shapePositions: Cartesian2[]; ellipsoid?: Ellipsoid; granularity?: number; vertexFormat?: VertexFormat; cornerType?: CornerType });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: PolylineVolumeGeometry): PolylineVolumeGeometry;

      static createGeometry(polylineVolumeGeometry: PolylineVolumeGeometry): Geometry | undefined;
  }

  class PolylineVolumeOutlineGeometry {
      packedLength: number;

      constructor(options: { polylinePositions: Cartesian3[]; shapePositions: number; ellipsoid?: Ellipsoid; granularity?: number; cornerType?: CornerType });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: PolylineVolumeOutlineGeometry): PolylineVolumeOutlineGeometry;

      static createGeometry(polylineVolumeOutlineGeometry: PolylineVolumeOutlineGeometry): Geometry | undefined;
  }

  class QuantizedMeshTerrainData {
      waterMask: Uint8Array | HTMLImageElement | HTMLCanvasElement;

      constructor(options: { quantizedVertices: Uint16Array; indices: Uint16Array | Uint32Array; minimumHeight: number; maximumHeight: number; boundingSphere: BoundingSphere; horizonOcclusionPoint: Cartesian3; westIndices: number[]; southIndices: number[]; eastIndices: number[]; northIndices: number[]; westSkirtHeight: number; southSkirtHeight: number; eastSkirtHeight: number; northSkirtHeight: number; childTileMask?: number; createdByUpsampling?: boolean; encodedNormals?: Uint8Array; waterMask?: Uint8Array });

      createMesh(tilingScheme: TilingScheme, x: number, y: number, level: number): Promise<TerrainMesh>;

      upsample(tilingScheme: TilingScheme, thisX: number, thisY: number, thisLevel: number, descendantX: number, descendantY: number, descendantLevel: number): Promise<QuantizedMeshTerrainData>;

      interpolateHeight(rectangle: Rectangle, longitude: number, latitude: number): number;

      isChildAvailable(thisX: number, thisY: number, childX: number, childY: number): boolean;

      wasCreatedByUpsampling(): boolean;
  }

  class Quaternion {
      x: number;
      y: number;
      z: number;
      w: number;
      static packedLength: number;
      static packedInterpolationLength: number;
      static ZERO: Quaternion;
      static IDENTITY: Quaternion;

      constructor(x?: number, y?: number, z?: number, w?: number);

      clone(result?: Quaternion): Quaternion;

      equals(right?: Quaternion): boolean;

      equalsEpsilon(right: Quaternion, epsilon: number): boolean;

      toString(): string;

      static fromAxisAngle(axis: Cartesian3, angle: number, result?: Quaternion): Quaternion;

      static fromRotationMatrix(matrix: Matrix3, result?: Quaternion): Quaternion;

      static fromHeadingPitchRoll(heading: number, pitch: number, roll: number, result: Quaternion): Quaternion;

      static pack(value: Quaternion, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Quaternion): Quaternion;

      static convertPackedArrayForInterpolation(packedArray: number[], startingIndex?: number, lastIndex?: number, result?: number[]): void;

      static unpackInterpolationResult(array: number[], sourceArray: number[], startingIndex?: number, lastIndex?: number, result?: Quaternion): Quaternion;

      static clone(quaternion: Quaternion, result?: Quaternion): Quaternion;

      static conjugate(quaternion: Quaternion, result: Quaternion): Quaternion;

      static magnitudeSquared(quaternion: Quaternion): number;

      static magnitude(quaternion: Quaternion): number;

      static normalize(quaternion: Quaternion, result: Quaternion): Quaternion;

      static inverse(quaternion: Quaternion, result: Quaternion): Quaternion;

      static add(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion;

      static subtract(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion;

      static negate(quaternion: Quaternion, result: Quaternion): Quaternion;

      static dot(left: Quaternion, right: Quaternion): number;

      static multiply(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion;

      static multiplyByScalar(quaternion: Quaternion, scalar: number, result: Quaternion): Quaternion;

      static divideByScalar(quaternion: Quaternion, scalar: number, result: Quaternion): Quaternion;

      static computeAxis(quaternion: Quaternion, result: Cartesian3): Cartesian3;

      static computeAngle(quaternion: Quaternion): number;

      static lerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion;

      static slerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion;

      static log(quaternion: Quaternion, result: Cartesian3): Cartesian3;

      static exp(cartesian: Cartesian3, result: Quaternion): Quaternion;

      static computeInnerQuadrangle(q0: Quaternion, q1: Quaternion, q2: Quaternion, result: Quaternion): Quaternion;

      static squad(q0: Quaternion, q1: Quaternion, s0: Quaternion, s1: Quaternion, t: number, result: Quaternion): Quaternion;

      static fastSlerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion;

      static fastSquad(q0: Quaternion, q1: Quaternion, s0: Quaternion, s1: Quaternion, t: number, result?: Quaternion): Quaternion;

      static equals(left?: Quaternion, right?: Quaternion): boolean;

      static equalsEpsilon(left: Quaternion, right: Quaternion, epsilon: number): boolean;
  }

  class QuaternionSpline {
      times: number[];
      points: Quaternion[];
      innerQuadrangles: Quaternion[];

      constructor(options: { times: number[]; points: Quaternion[]; firstInnerQuadrangle?: Quaternion; lastInnerQuadrangle?: Quaternion });

      findTimeInterval(time: number): number;

      evaluate(time: number, result?: Quaternion): Quaternion;
  }

  module Queue {
      type Comparator = (a: any, b: any) => number;
  }

  class Ray {
      origin: Cartesian3;
      direction: Cartesian3;

      constructor(origin?: Cartesian3, direction?: Cartesian3);

      static getPoint(t: number, result?: Cartesian3): Cartesian3;
  }

  class Rectangle {
      west: number;
      south: number;
      east: number;
      north: number;
      width: number;
      height: number;
      static packedLength: number;
      static MAX_VALUE: Rectangle;

      constructor(west?: number, south?: number, east?: number, north?: number);

      clone(result?: Rectangle): Rectangle;

      equals(other?: Rectangle): boolean;

      equalsEpsilon(other: Rectangle, epsilon: number): boolean;

      static pack(value: Rectangle, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: Rectangle): Rectangle;

      static computeWidth(rectangle: Rectangle): number;

      static computeHeight(rectangle: Rectangle): number;

      static fromDegrees(west?: number, south?: number, east?: number, north?: number, result?: Rectangle): Rectangle;

      static fromCartesianArray(cartesians: Cartesian3[], ellipsoid?: Ellipsoid, result?: Rectangle): Rectangle

      static fromCartographicArray(cartographics: Cartographic[], result?: Rectangle): Rectangle;

      static clone(rectangle: Rectangle, result?: Rectangle): Rectangle;

      static equals(left?: Rectangle, right?: Rectangle): boolean;

      /**
       *
       * @param rectangle
       * @throws {DeveloperError}
       */
      static validate(rectangle: Rectangle): void;

      static southwest(rectangle: Rectangle, result?: Cartographic): Cartographic;

      static northwest(rectangle: Rectangle, result?: Cartographic): Cartographic;

      static northeast(rectangle: Rectangle, result?: Cartographic): Cartographic;

      static southeast(rectangle: Rectangle, result?: Cartographic): Cartographic;

      static center(rectangle: Rectangle, result?: Cartographic): Cartographic;

      static intersection(rectangle: Rectangle, otherRectangle: Rectangle, result?: Rectangle): Rectangle;

      static contains(rectangle: Rectangle, cartographic: Cartographic): boolean;

      static subsample(rectangle: Rectangle, ellipsoid?: Ellipsoid, surfaceHeight?: number, result?: Cartesian3[]): Cartesian3[];
  }

  class RectangleGeometry {
      static packedLength: number;

      constructor(options: {
          rectangle: Rectangle;
          vertexFormat?: VertexFormat;
          ellipsoid?: Ellipsoid;
          granularity?: number;
          height?: number;
          rotation?: number;
          stRotation?: number;
          extrudedHeight?: number;
          closeTop?: boolean;
          closeBottom?: boolean;
      });

      static createGeometry(rectangleGeometry: RectangleGeometry): Geometry | undefined;

      static pack(value: BoundingSphere, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: RectangleGeometry): RectangleGeometry;
  }

  class RectangleOutlineGeometry {
      static packedLength: number;

      constructor(options: { rectangle: Rectangle; ellipsoid?: Ellipsoid; granularity?: number; height?: number; rotation?: number; extrudedHeight?: number });

      static pack(value: BoundingSphere, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: RectangleGeometry): RectangleGeometry;

      static createGeometry(rectangleGeometry: RectangleOutlineGeometry): Geometry | undefined;
  }

  class RequestErrorEvent {
      statusCode: number;
      response: any;
      responseHeaders: any;

      constructor(statusCode?: number, response?: any, responseHeaders?: string | any);

      toString(): string;
  }

  type ResourceCallback = (resource: Resource, error: Error) => boolean | Promise<boolean>;

  type ResourceOptions = {
      url: string;
      queryParameters?: object;
      templateValues?: object;
      headers?: object;
      proxy?: DefaultProxy;
      retryCallback?: ResourceCallback;
      retryAttempts?: number;
      request?: any; // Cesium.Request
  };

  class Resource {
      readonly queryParameters: any
      readonly templateValues: any
      hasHeaders: boolean
      headers: object
      isCrossOriginUrl: boolean
      isDataUri: boolean
      proxy: DefaultProxy
      request: Request
      retryAttempts: number
      retryCallback: Function
      url: string
      constructor(options: string | ResourceOptions);

      addQueryParameters(params: any, useAsDefault?: boolean)
      addTemplateValues(template: any, useAsDefault?: boolean)
      appendQueryParameters(params: any)
      clone(result?: Resource): Resource
      fetch(options?: any): Promise<any> | undefined
  }


  class RuntimeError {
      name: string;
      message: string;
      stack: string;

      constructor(message?: string);
  }

  class ScreenSpaceEventHandler {
      constructor(element?: HTMLCanvasElement);

      setInputAction(action: ScreenSpaceEventAction, type: number, modifier?: number): void;

      getInputAction(type: number, modifier?: number): ScreenSpaceEventAction;

      removeInputAction(type: number, modifier?: number): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  type ScreenSpaceEventAction = (evt: PositionedEvent | MoveEvent | Touch2Event) => void;

  class ShowGeometryInstanceAttribute {
      value: Uint8Array;
      componentDatatype: ComponentDatatype;
      componentsPerAttribute: number;
      normalize: boolean;

      constructor(show?: boolean);

      static toValue(show: boolean, result?: Uint8Array): Uint8Array;
  }

  class SimplePolylineGeometry {
      packedLength: number;

      constructor(options: {
          positions: Cartesian3[];
          colors?: Color[];
          colorsPerVertex?: boolean;
          followSurface?: boolean;
          granularity?: number;
          ellipsoid?: Ellipsoid
      });

      static createGeometry(simplePolylineGeometry: SimplePolylineGeometry): Geometry | undefined;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: SimplePolylineGeometry): SimplePolylineGeometry;
  }

  class SphereGeometry {
      static packedLength: number;

      constructor(options?: { radius?: number; stackPartitions?: number; slicePartitions?: number; vertexFormat?: VertexFormat });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: SphereGeometry): SphereGeometry;

      static createGeometry(sphereGeometry: SphereGeometry): Geometry | undefined;
  }

  class SphereOutlineGeometry {
      static packedLength: number;

      constructor(options?: { radius?: number; stackPartitions?: number; slicePartitions?: number; subdivisions?: number });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: SphereOutlineGeometry): SphereOutlineGeometry;

      static createGeometry(sphereGeometry: SphereOutlineGeometry): Geometry | undefined;
  }

  class Spherical {
      constructor(clock?: number, cone?: number, magnitude?: number);

      equals(other: Spherical): boolean;

      clone(result?: Spherical): Spherical;

      equalsEpsilon(other: Spherical, epsilon: number): boolean;

      toString(): string;

      static fromCartesian3(cartesian3: Cartesian3, spherical?: Spherical): Spherical;

      static clone(spherical: Spherical, result?: Spherical): Spherical;

      static normalize(spherical: Spherical, result?: Spherical): Spherical;

      static equals(left: Spherical, right: Spherical): boolean;

      static equalsEpsilon(left: Spherical, right: Spherical, epsilon?: number): boolean;
  }

  class Spline {
      times: number[];
      points: Cartesian3[] | Quaternion[];

      evaluate(time: number, result?: Cartesian3 | Quaternion): Cartesian3 | Quaternion;

      findTimeInterval(time: number, startIndex: number): number;
  }

  class TaskProcessor {
      constructor(workerName: string, maximumActiveTasks?: number);

      scheduleTask(parameters: any, transferableObjects?: any[]): Promise<any>;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class TerrainData {
      waterMask: Uint8Array | HTMLImageElement | HTMLCanvasElement;

      interpolateHeight(rectangle: Rectangle, longitude: number, latitude: number): number;

      isChildAvailable(thisX: number, thisY: number, childX: number, childY: number): boolean;

      createMesh(tilingScheme: TilingScheme, x: number, y: number, level: number): Promise<TerrainMesh>;

      upsample(tilingScheme: TilingScheme, thisX: number, thisY: number, thisLevel: number, descendantX: number, descendantY: number, descendantLevel: number): Promise<TerrainData>;

      wasCreatedByUpsampling(): boolean;
  }

  class TerrainMesh {
      center: Cartesian3;
      vertices: Float32Array;
      stride: number;
      indices: Uint16Array | Uint32Array;
      minimumHeight: number;
      maximumHeight: number;
      boundingSphere3D: BoundingSphere;
      occludeePointInScaledSpace: Cartesian3;

      constructor(center: Cartesian3, vertices: Float32Array, indices: Uint16Array | Uint32Array, minimumHeight: number, maximumHeight: number, boundingSphere3D: BoundingSphere, occludeePointInScaledSpace: Cartesian3, vertexStride?: number);
  }

  class TerrainProvider {
      static heightmapTerrainQuality: number;
      credit: Credit;
      errorEvent: Event;
      hasVertexNormals: boolean;
      hasWaterMask: boolean;
      ready: boolean;
      readonly readyPromise: Promise<boolean>;
      tilingScheme: TilingScheme;

      static getEstimatedLevelZeroGeometricErrorForAHeightmap(ellipsoid: Ellipsoid, tileImageWidth: number, numberOfTilesAtLevelZero: number): number;

      static getRegularGridIndices(width: number, height: number): Uint16Array;

      getLevelMaximumGeometricError(level: number): number;

      getTileDataAvailable(x: number, y: number, level: number): boolean;

      requestTileGeometry(x: number, y: number, level: number, request?: Request): Promise<TerrainData>;
  }

  class TileProviderError {
      provider: ImageryProvider | TerrainProvider;
      message: string;
      x: number;
      y: number;
      level: number;
      timesRetried: number;
      retry: boolean;
      error: Error;

      constructor(provider: ImageryProvider | TerrainProvider, message: string, x?: number, y?: number, level?: number, timesRetried?: number, error?: Error);

      static handleError(previousError: TileProviderError, provider: ImageryProvider | TerrainProvider, event: Event, message: string, x: number, y: number, level: number, retryFunction: TileProviderError.RetryFunction, errorDetails?: Error): TileProviderError;

      static handleSuccess(previousError: TileProviderError): void;
  }

  module TileProviderError {
      type RetryFunction = () => void;
  }

  class TilingScheme {
      ellipsoid: Ellipsoid;
      rectangle: Rectangle;
      projection: MapProjection;

      getNumberOfXTilesAtLevel(level: number): number;

      getNumberOfYTilesAtLevel(level: number): number;

      rectangleToNativeRectangle(rectangle: Rectangle, result?: Rectangle): Rectangle;

      tileXYToNativeRectangle(x: number, y: number, level: number, result?: any): Rectangle;

      tileXYToRectangle(x: number, y: number, level: number, result?: any): Rectangle;

      positionToTileXY(position: Cartographic, level: number, result?: Cartesian2): Cartesian2;
  }

  class TimeInterval {
      start: JulianDate;
      stop: JulianDate;
      data: any;
      isStartIncluded: boolean;
      isStopIncluded: boolean;
      isEmpty: boolean;
      static EMPTY: TimeInterval;

      constructor(options?: { start?: JulianDate; stop?: JulianDate; isStartIncluded?: boolean; isStopIncluded?: boolean; data?: any });

      clone(result?: TimeInterval): TimeInterval;

      equals(right?: TimeInterval, dataComparer?: TimeInterval.DataComparer): boolean;

      equalsEpsilon(right: TimeInterval, epsilon: number, dataComparer?: TimeInterval.DataComparer): boolean;

      toString(): string;

      static fromIso8601(options: { iso8601: string; isStartIncluded?: boolean; isStopIncluded?: boolean; data?: any }, result?: TimeInterval): TimeInterval;

      static toIso8601(timeInterval: TimeInterval, precision?: number): string;

      static clone(timeInterval?: TimeInterval, result?: TimeInterval): TimeInterval;

      static equals(left?: TimeInterval, right?: TimeInterval, dataComparer?: TimeInterval.DataComparer): boolean;

      static equalsEpsilon(left: TimeInterval, right: TimeInterval, epsilon: number, dataComparer?: TimeInterval.DataComparer): boolean;

      static intersect(left: TimeInterval, right: TimeInterval, result: TimeInterval, mergeCallback?: TimeInterval.MergeCallback): TimeInterval;

      static contains(timeInterval: TimeInterval, julianDate: JulianDate): boolean;
  }

  module TimeInterval {
      type MergeCallback = (leftData: any, rightData: any) => any;
      type DataComparer = (leftData: any, rightData: any) => boolean;
  }

  class TimeIntervalCollection {
      changedEvent: Event;
      start: JulianDate;
      isStartIncluded: boolean;
      stop: JulianDate;
      isStopIncluded: boolean;
      length: number;
      isEmpty: boolean;

      constructor(intervals?: TimeInterval[]);

      equals(right?: TimeIntervalCollection, dataComparer?: TimeInterval.DataComparer): boolean;

      get(index: number): TimeInterval;

      removeAll(): void;

      findIntervalContainingDate(date: JulianDate): TimeInterval;

      findDataForIntervalContainingDate(date: JulianDate): Object;

      contains(julianDate: JulianDate): boolean;

      indexOf(date: JulianDate): number;

      findInterval(options?: { start?: JulianDate; stop?: JulianDate; isStartIncluded?: boolean; isStopIncluded?: boolean }): TimeInterval;

      addInterval(interval: TimeInterval, dataComparer?: TimeInterval.DataComparer): void;

      removeInterval(interval: TimeInterval): void;

      intersect(other: TimeIntervalCollection, dataComparer?: TimeInterval.DataComparer, mergeCallback?: TimeInterval.MergeCallback): TimeIntervalCollection;
  }

  class GoogleEarthEnterpriseTerrainProvider extends TerrainProvider {
      readonly credit: Credit;
      readonly errorEvent: Event;
      hasVertexNormals: boolean;
      hasWaterMask: boolean;
      readonly proxy: Proxy;
      readonly ready: boolean;
      readonly readyPromise: Promise<boolean>;
      readonly tilingScheme: TilingScheme;
      readonly url: string;

      constructor(options: { url: Resource | string; metadata: GoogleEarthEnterpriseMetadata; ellipsoid?: Ellipsoid; credit?: Credit | string });

      getLevelMaximumGeometricError(level: number): number;

      getTileDataAvailable(x: number, y: number, level: number): boolean;

      requestTileGeometry(x: number, y: number, level: number, request?: Request): Promise<TerrainData>;
  }

  class GoogleEarthEnterpriseMetadata {
      constructor(resourceOrUrl: Resource | string);
  }

  class VRTheWorldTerrainProvider extends TerrainProvider {
      credit: Credit;
      errorEvent: Event;
      hasVertexNormals: boolean;
      hasWaterMask: boolean;
      ready: boolean;
      readonly readyPromise: Promise<boolean>;
      tilingScheme: GeographicTilingScheme;

      constructor(options: { url: string; proxy?: any; ellipsoid?: Ellipsoid; credit?: Credit | string });

      getLevelMaximumGeometricError(level: number): number;

      getTileDataAvailable(x: number, y: number, level: number): boolean;

      requestTileGeometry(x: number, y: number, level: number, request?: Request): Promise<TerrainData>;
  }

  class VertexFormat {
      position: boolean;
      normal: boolean;
      st: boolean;
      binormal: boolean;
      tangent: boolean;
      color: boolean;
      static POSITION_ONLY: VertexFormat;
      static POSITION_AND_NORMAL: VertexFormat;
      static POSITION_NORMAL_AND_ST: VertexFormat;
      static POSITION_AND_ST: VertexFormat;
      static POSITION_AND_COLOR: VertexFormat;
      static ALL: VertexFormat;
      static DEFAULT: VertexFormat;
      static packedLength: number;

      constructor(options?: any);

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: VertexFormat): VertexFormat;

      static clone(cartesian: VertexFormat, result?: VertexFormat): VertexFormat;
  }

  class WallGeometry {
      packedLength: number;

      constructor(options: {
          positions: Cartesian3[];
          granularity?: number;
          maximumHeights?: number[];
          minimumHeights?: number[];
          ellipsoid?: Ellipsoid;
          vertexFormat?: VertexFormat
      });

      static createGeometry(wallGeometry: WallGeometry): Geometry | undefined;

      static fromConstantHeights(positions: Cartesian3[], maximumHeight?: number, minimumHeight?: number, ellipsoid?: Ellipsoid): WallGeometry;

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: WallGeometry): WallGeometry;
  }

  class WallOutlineGeometry {
      packedLength: number;

      constructor(options: { positions: Cartesian3[]; granularity?: number; maximumHeights?: number[]; minimumHeights?: number[]; ellipsoid?: Ellipsoid });

      static pack(value: any, array: number[], startingIndex?: number): number[];

      static unpack(array: number[], startingIndex?: number, result?: WallOutlineGeometry): WallOutlineGeometry;

      static fromConstantHeights(positions: Cartesian3[], maximumHeight?: number, minimumHeight?: number, ellipsoid?: Ellipsoid): WallOutlineGeometry;

      static createGeometry(wallGeometry: WallOutlineGeometry): Geometry | undefined;
  }

  class WebMercatorProjection {
      ellipsoid: Ellipsoid;
      static MaximumLatitude: number;

      constructor(ellipsoid?: Ellipsoid);

      project(cartographic: Cartographic, result?: Cartesian3): Cartesian3;

      unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic;

      static mercatorAngleToGeodeticLatitude(mercatorAngle: number): number;

      static geodeticLatitudeToMercatorAngle(latitude: number): number;
  }

  class WebMercatorTilingScheme {
      ellipsoid: Ellipsoid;
      rectangle: Rectangle;
      projection: MapProjection;

      constructor(options?: { ellipsoid?: Ellipsoid; numberOfLevelZeroTilesX?: number; numberOfLevelZeroTilesY?: number; rectangleSouthwestInMeters?: Cartesian2; rectangleNortheastInMeters?: Cartesian2 });

      getNumberOfXTilesAtLevel(level: number): number;

      getNumberOfYTilesAtLevel(level: number): number;

      rectangleToNativeRectangle(rectangle: Rectangle, result?: Rectangle): Rectangle;

      tileXYToNativeRectangle(x: number, y: number, level: number, result?: any): Rectangle;

      tileXYToRectangle(x: number, y: number, level: number, result?: any): Rectangle;

      positionToTileXY(position: Cartographic, level: number, result?: Cartesian2): Cartesian2;
  }

  type BillboardGraphicsOptions = {
      image?: any | String | HTMLCanvasElement;
      show?: any | boolean;
      scale?: any | number;
      horizontalOrigin?: any | HorizontalOrigin;
      verticalOrigin?: any | VerticalOrigin;
      eyeOffset?: any;
      pixelOffset?: any | Cartesian2;
      rotation?: any;
      alignedAxis?: any;
      width?: any | number;
      height?: any | number;
      color?: any;
      scaleByDistance?: any | NearFarScalar;
      translucencyByDistance?: any | NearFarScalar;
      pixelOffsetScaleByDistance?: any | NearFarScalar;
      imageSubRegion?: any
  }

  class BillboardGraphics {
      readonly definitionChanged: Event;
      disableDepthTestDistance: any | any;
      distanceDisplayCondition: any | any;
      heightReference: any | any;
      sizeInMeters: any | any;
      image: any | any;
      imageSubRegion: any | any;
      scale: any | any;
      rotation: any | any;
      alignedAxis: any | any;
      horizontalOrigin: any | any;
      verticalOrigin: any | any;
      color: any | any;
      eyeOffset: any | any;
      pixelOffset: any | any;
      show: any | any;
      width: any | any;
      height: any | any;
      scaleByDistance: any | any;
      translucencyByDistance: any | any;
      pixelOffsetScaleByDistance: any | any;

      constructor(options?: BillboardGraphicsOptions);

      clone(result?: BillboardGraphics): BillboardGraphics;

      merge(source: BillboardGraphics): void;
  }

  class BillboardVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      update(time: JulianDate): boolean;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class BoxGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class BoxGraphics {
      definitionChanged: Event;
      show: any;
      dimensions: any;
      material: MaterialProperty;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;

      constructor(options?: { dimensions?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any });

      clone(result?: BoxGraphics): BoxGraphics;

      merge(source: BoxGraphics): void;
  }

  class CallbackProperty {
      isConstant: boolean;
      definitionChanged: Event;

      constructor(callback: CallbackProperty.Callback, isConstant: boolean);

      getValue(time?: JulianDate, result?: any): any;

      setCallback(callback: CallbackProperty.Callback, isConstant: boolean): void;

      equals(other?: any): boolean;
  }

  module CallbackProperty {
      type Callback = (time?: JulianDate, result?: any) => any;
  }

  class CheckerboardMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      evenColor: any;
      oddColor: any;
      repeat: any;

      constructor(options?: { evenColor?: any; oddColor?: any; repeat?: any });

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class ColorMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      color: any;

      constructor(color?: any);

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class CompositeEntityCollection {
      collectionChanged: Event;
      id: string;
      values: Entity[];

      constructor(collections?: EntityCollection[]);

      addCollection(collection: EntityCollection, index?: number): void;

      removeCollection(collection: EntityCollection): boolean;

      removeAllCollections(): void;

      containsCollection(collection: EntityCollection): boolean;

      contains(entity: Entity): boolean;

      indexOfCollection(collection: EntityCollection): number;

      getCollection(index: number): EntityCollection;

      getCollectionsLength(): number;

      raiseCollection(collection: EntityCollection): void;

      lowerCollection(collection: EntityCollection): void;

      raiseCollectionToTop(collection: EntityCollection): void;

      lowerCollectionToBottom(collection: EntityCollection): void;

      suspendEvents(): void;

      resumeEvents(): void;

      computeAvailability(): TimeInterval;

      getById(id: any): Entity;
  }

  class CompositeMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      intervals: TimeIntervalCollection;

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class CompositePositionProperty {
      isConstant: boolean;
      definitionChanged: Event;
      intervals: TimeIntervalCollection;
      referenceFrame: ReferenceFrame;

      getValue(time: JulianDate, result?: any): any;

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3;

      equals(other?: any): boolean;
  }

  class CompositeProperty {
      isConstant: boolean;
      definitionChanged: Event;
      intervals: TimeIntervalCollection;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class ConstantPositionProperty {
      isConstant: boolean;
      definitionChanged: Event;
      referenceFrame: ReferenceFrame;

      constructor(value?: Cartesian3, referenceFrame?: ReferenceFrame);

      getValue(time: JulianDate, result?: any): any;

      setValue(value: Cartesian3, referenceFrame?: ReferenceFrame): void;

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3;

      equals(other?: any): boolean;
  }

  class ConstantProperty {
      isConstant: boolean;
      definitionChanged: Event;

      constructor(value?: any);

      getValue(time?: JulianDate, result?: any): any;

      setValue(value: any): void;

      equals(other?: any): boolean;
  }

  class CorridorGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class CorridorGraphics {
      definitionChanged: Event;
      show: any;
      material: MaterialProperty;
      positions: any;
      height: any;
      extrudedHeight: any;
      granularity: any;
      width: any;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;
      cornerType: any;

      constructor(options?: { positions?: any; width?: any; cornerType?: any; height?: any; extrudedHeight?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; granularity?: any });

      clone(result?: CorridorGraphics): CorridorGraphics;

      merge(source: CorridorGraphics): void;
  }

  class CustomDataSource extends DataSource {
      name: string;
      clock: DataSourceClock;
      entities: EntityCollection;
      isLoading: boolean;
      changedEvent: Event;
      errorEvent: Event;
      loadingEvent: Event;

      constructor(name?: string);
  }

  class CylinderGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class CylinderGraphics {
      definitionChanged: Event;
      length: any;
      topRadius: any;
      bottomRadius: any;
      numberOfVerticalLines: any;
      slices: any;
      show: any;
      material: MaterialProperty;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;

      constructor(options?: { length?: any; topRadius?: any; bottomRadius?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; numberOfVerticalLines?: any; slices?: any });

      clone(result?: CylinderGraphics): CylinderGraphics;

      merge(source: CylinderGraphics): void;
  }

  class CzmlDataSource extends DataSource {
      name: string;
      clock: DataSourceClock;
      entities: EntityCollection;
      isLoading: boolean;
      changedEvent: Event;
      errorEvent: Event;
      loadingEvent: Event;
      static updaters: any[];

      constructor(name?: string);

      process(data: string | any, options?: { sourceUri?: string }): Promise<CzmlDataSource>;

      load(data: string | any, options?: { sourceUri?: string }): Promise<CzmlDataSource>;
      static load(data: string | any, options?: { sourceUri?: string }): Promise<CzmlDataSource>;

      static processPacketData(type: Function, object: any, propertyName: string, packetData: any, interval: TimeInterval, sourceUri: string, entityCollection: EntityCollection): void;

      static processPositionPacketData(object: any, propertyName: string, packetData: any, interval: TimeInterval, sourceUri: string, entityCollection: EntityCollection): void;

      static processMaterialPacketData(object: any, propertyName: string, packetData: any, interval: TimeInterval, sourceUri: string, entityCollection: EntityCollection): void;
  }

  class DataSource {
      changedEvent: Event;
      clock: DataSourceClock;
      clustering: EntityCluster;
      entities: EntityCollection;
      errorEvent: Event;
      isLoading: boolean;
      loadingEvent: Event;
      name: string;
      show: boolean;

      update(time: JulianDate): boolean;
  }

  class DataSourceClock {
      definitionChanged: Event;
      startTime: JulianDate;
      stopTime: JulianDate;
      currentTime: JulianDate;
      clockRange: ClockRange;
      clockStep: ClockStep;
      multiplier: number;

      clone(result?: DataSourceClock): DataSourceClock;

      equals(other: DataSourceClock): boolean;

      merge(source: DataSourceClock): void;

      getValue(): Clock;
  }

  class DataSourceCollection {
      length: number;
      dataSourceAdded: Event;
      dataSourceRemoved: Event;

      add(dataSource: DataSource | Promise<DataSource>): Promise<DataSource>;

      remove(dataSource: DataSource, destroy?: boolean): boolean;

      removeAll(destroy?: boolean): void;

      contains(dataSource: DataSource): boolean;

      indexOf(dataSource: DataSource): number;

      get(index: number): DataSource;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class DataSourceDisplay {
      scene: Scene;
      dataSources: DataSourceCollection;
      defaultDataSource: CustomDataSource;
      static defaultVisualizersCallback: DataSourceDisplay.VisualizersCallback;

      constructor(options: { scene: Scene; dataSourceCollection: DataSourceCollection; visualizersCallback?: DataSourceDisplay.VisualizersCallback });

      isDestroyed(): boolean;

      destroy(): void;

      update(time: JulianDate): boolean;
  }

  module DataSourceDisplay {
      type VisualizersCallback = (scene: Scene, dataSource: DataSource) => Visualizer[];
  }

  class DynamicGeometryUpdater {
      update(time: JulianDate): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class EllipseGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class EllipseGraphics {
      definitionChanged: Event;
      semiMajorAxis: any;
      semiMinorAxis: any;
      rotation: any;
      show: any;
      material: MaterialProperty;
      height: any;
      extrudedHeight: any;
      granularity: any;
      stRotation: any;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;
      numberOfVerticalLines: any;

      constructor(options?: { semiMajorAxis?: number; semiMinorAxis?: number; height?: any; extrudedHeight?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; numberOfVerticalLines?: any; rotation?: any; stRotation?: any; granularity?: any });

      clone(result?: EllipseGraphics): EllipseGraphics;

      merge(source: EllipseGraphics): void;
  }

  class EllipsoidGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class EllipsoidGraphics {
      definitionChanged: Event;
      show: any;
      radii: any;
      material: MaterialProperty;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;
      stackPartitions: any;
      slicePartitions: any;
      subdivisions: any;

      constructor(options?: { radii?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; subdivisions?: any; stackPartitions?: any; slicePartitions?: any });

      clone(result?: EllipsoidGraphics): EllipsoidGraphics;

      merge(source: EllipsoidGraphics): void;
  }

  class Entity {
      availability: TimeIntervalCollection;
      id: string;
      definitionChanged: Event;
      name: string;
      show: boolean;
      isShowing: boolean;
      parent: Entity;
      propertyNames: Event;
      billboard: BillboardGraphics;
      box: BoxGraphics;
      corridor: CorridorGraphics;
      cylinder: CylinderGraphics;
      description: any | any;
      ellipse: EllipseGraphics;
      ellipsoid: EllipsoidGraphics;
      entityCollection: EntityCollection;
      label: LabelGraphics;
      model: ModelGraphics;
      orientation: any;
      path: PathGraphics;
      point: PointGraphics;
      polygon: PolygonGraphics;
      polyline: PolylineGraphics;
      polylineVolume: PolylineVolumeGraphics;
      position: PositionProperty;
      properties: PropertyBag;
      rectangle: RectangleGraphics;
      viewFrom: any;
      wall: WallGraphics;

      constructor(options?: EntityOptions);

      isAvailable(time: JulianDate): boolean;

      addProperty(propertyName: string): void;

      removeProperty(propertyName: string): void;

      merge(source: Entity): void;
  }

  class EntityOptions {
      id?: string;
      name?: string;
      show?: boolean;
      description?: any | string;
      position?: any | Cartesian3;
      orientation?: any | any;
      viewFrom?: any | any;
      parent?: Entity;
      billboard?: BillboardGraphics | BillboardGraphicsOptions;
      box?: BoxGraphics;
      corridor?: CorridorGraphics;
      cylinder?: CylinderGraphics;
      ellipse?: EllipseGraphics;
      ellipsoid?: EllipsoidGraphics;
      label?: LabelGraphics | LabelGraphicsOptions;
      model?: ModelGraphics;
      path?: PathGraphics;
      point?: PointGraphics;
      polygon?: PolygonGraphics | PolygonGraphicsOptions;
      polyline?: PolylineGraphics | PolylineGraphicsOptions;
      polylineVolume?: PolylineVolumeGraphics;
      properties?: { [key: string]: string | number | boolean };
      rectangle?: RectangleGraphics;
      wall?: WallGraphics
  }

  class EntityCluster {
      constructor(options: EntityClusterOptions);

      clusterBillboards: boolean;
      clusterEvent: Event;
      clusterLabels: boolean;
      clusterPoints: boolean;
      enabled: boolean;
      minimumClusterSize: number;
      pixelRange: number;
  }

  type EntityClusterOptions = {
      clusterBillboards?: boolean;
      clusterLabels?: boolean;
      clusterPoints?: boolean;
      enabled?: boolean;
      minimumClusterSize?: number;
      pixelRange?: number;
  }

  module EntityCluster {
      type newClustterCallback = (clusteredEntities: Entity[], cluster: { billboard: BillboardGraphics, label: LabelGraphics, point: PointGraphics }) => void;
  }

  class EntityCollection {
      collectionChanged: Event;
      id: string;
      owner: DataSource | CompositeEntityCollection;
      show: boolean;
      values: Entity[];

      suspendEvents(): void;

      resumeEvents(): void;

      computeAvailability(): TimeInterval;

      add(entity: Entity | EntityOptions): Entity;

      remove(entity: Entity): boolean;

      contains(entity: Entity): boolean;

      removeById(id: any): boolean;

      removeAll(): void;

      getById(id: any): Entity;

      getOrCreateEntity(id: any): Entity;
  }

  module EntityCollection {
      type collectionChangedEventCallback = (collection: EntityCollection, added: Entity[], removed: Entity[], changed: Entity[]) => void;
  }

  class EntityView {
      entity: Entity;
      scene: Scene;
      ellipsoid: Ellipsoid;
      boundingSphere: Entity;
      static defaultOffset3D: Cartesian3;

      constructor(entity: Entity, scene: Scene, ellipsoid?: Ellipsoid, boundingSphere?: BoundingSphere);

      update(time: JulianDate): void;
  }

  class GeoJsonDataSource extends DataSource {
      name: string;
      clock: DataSourceClock;
      entities: EntityCollection;
      isLoading: boolean;
      changedEvent: Event;
      errorEvent: Event;
      loadingEvent: Event;
      static markerSize: number;
      static markerSymbol: string;
      static markerColor: Color;
      static stroke: Color;
      static strokeWidth: number;
      static fill: Color;
      static crsNames: any;
      static crsLinkHrefs: any;
      static crsLinkTypes: any;

      constructor(name?: string);

      load(data: string | any, options?: {
          sourceUri?: string;
          markerSize?: number;
          markerSymbol?: string;
          markerColor?: Color;
          stroke?: Color;
          strokeWidth?: number;
          fill?: Color;
          clampToGround?: boolean;
      }): Promise<GeoJsonDataSource>;
      static load(data: string | any, options?: {
          sourceUri?: string;
          describe?: (properties: Object, nameProperty: string) => void;
          markerSize?: number;
          markerSymbol?: string;
          markerColor?: Color;
          stroke?: Color;
          strokeWidth?: number;
          fill?: Color;
          clampToGround?: boolean;
      }): Promise<GeoJsonDataSource>;
  }

  class GeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class GeometryVisualizer {
      constructor(type: GeometryUpdater, scene: Scene, entityCollection: EntityCollection);

      update(time: JulianDate): boolean;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class GridMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      color: Color;
      cellAlpha: any;
      lineCount: any;
      lineThickness: any;
      lineOffset: any;

      constructor(options?: { color?: any; cellAlpha?: any; lineCount?: any; lineThickness?: any; lineOffset?: any });

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class ImageMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      image: any;
      repeat: any;

      constructor(options?: { image?: any; repeat?: any });

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class KmlDataSource extends DataSource {
      name: string;
      clock: DataSourceClock;
      entities: EntityCollection;
      isLoading: boolean;
      changedEvent: Event;
      errorEvent: Event;
      loadingEvent: Event;

      constructor(options: KmlConstructorOptions);

      load(data: string | Document | Blob, options?: KmlLoadOptions): Promise<KmlDataSource>;
      static load(data: string | Document | Blob, options?: KmlConstructorOptions & KmlLoadOptions): Promise<KmlDataSource>;
  }

  class KmlConstructorOptions {
      camera: Camera;
      canvas: HTMLCanvasElement;
      proxy?: DefaultProxy;
  }

  class KmlLoadOptions {
      camera: Camera;
      canvas: HTMLCanvasElement;
      proxy?: DefaultProxy;
      sourceUri?: string;
      clampToGround?: boolean;
      query?: Object;
  }

  class KmlFeatureData {
      author: { name: string; uri: string; email: string };
      link: { href: string; hreflang: string; rel: string; type: string; title: string; length: string };
      address: string;
      phoneNumber: string;
      snippet: string;
      extendedData: string;
  }

  class LabelGraphics {
      readonly definitionChanged: Event;
      showBackground: any | boolean;
      distanceDisplayCondition: any | any;
      disableDepthTestDistance: any | any;
      text: any;
      font: any;
      style: any;
      fillColor: any;
      outlineColor: any;
      outlineWidth: any;
      horizontalOrigin: any;
      verticalOrigin: any;
      eyeOffset: any;
      pixelOffset: any;
      scale: any;
      show: any;
      translucencyByDistance: any;
      pixelOffsetScaleByDistance: any;

      constructor(options?: LabelGraphicsOptions);

      clone(result?: LabelGraphics): LabelGraphics;

      merge(source: LabelGraphics): void;
  }

  class LabelGraphicsOptions {
      text?: any | string;
      font?: any | string;
      style?: any;
      fillColor?: any | Color;
      backgroundColor?: any | Color;
      outlineColor?: any | Color;
      outlineWidth?: any | number;
      show?: any | boolean;
      showBackground?: any | boolean;
      scale?: any | NearFarScalar | any;
      scaleByDistance?: any | NearFarScalar;
      horizontalOrigin?: any | HorizontalOrigin;
      verticalOrigin?: any | VerticalOrigin;
      eyeOffset?: any | Cartesian2;
      pixelOffset?: any | Cartesian2;
      translucencyByDistance?: any | NearFarScalar;
      pixelOffsetScaleByDistance?: any | NearFarScalar;
      distanceDisplayCondition?: any | DistanceDisplayCondition;
      disableDepthTestDistance?: any | number;
      heightReference?: any | number;
  }

  class LabelVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      update(time: JulianDate): boolean;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class MaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;

      equals(left: MaterialProperty, right: MaterialProperty): boolean;

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;
  }

  class ModelGraphics {
      readonly definitionChanged: Event;
      show: any | boolean;
      scale: any | number;
      minimumPixelSize: any | number;
      uri: any | string;
      maximumScale: any | number;

      constructor(options?: { uri?: any | string; show?: any; scale?: any | number; minimumPixelSize?: any | number; maximumScale: any | number });

      clone(result?: ModelGraphics): ModelGraphics;

      merge(source: ModelGraphics): void;
  }

  class ModelVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      update(time: JulianDate): boolean;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class PathGraphics {
      definitionChanged: Event;
      show: any;
      material: MaterialProperty;
      width: any;
      resolution: any;
      leadTime: any;
      trailTime: any;

      constructor(options?: { leadTime?: any; trailTime?: any; show?: any; width?: any; material?: MaterialProperty; resolution?: any });

      clone(result?: PathGraphics): PathGraphics;

      merge(source: PathGraphics): void;
  }

  class PathVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      update(time: JulianDate): boolean;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class PointGraphics {
      color: any;
      pixelSize: any;
      outlineColor: any;
      outlineWidth: any;
      show: any | boolean;
      scaleByDistance: any;
      translucencyByDistance: any;
      heightReference: any;
      distanceDisplayCondition: any;

      constructor(options?: PointGraphicsOptions);

      clone(result?: PointGraphics): PointGraphics;

      merge(source: PointGraphics): void;
  }

  class PointGraphicsOptions {
      color?: Color;
      pixelSize?: number;
      outlineColor?: Color;
      outlineWidth?: number;
      show?: any | boolean;
      scaleByDistance?: any | NearFarScalar;
      translucencyByDistance?: any | NearFarScalar;
      heightReference?: HeightReference;
      distanceDisplayCondition?: any | number;
  }

  class PointVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      update(time: JulianDate): boolean;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class PolygonGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class PolygonGraphics {
      definitionChanged: Event;
      show: any | boolean;
      material: MaterialProperty;
      positions: any;
      hierarchy: any;
      height: any;
      extrudedHeight: any;
      granularity: any;
      stRotation: any;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;
      perPositionHeight: any;

      constructor(options?: PolygonGraphicsOptions);

      clone(result?: PolygonGraphics): PolygonGraphics;

      merge(source: PolygonGraphics): void;
  }

  class PolygonGraphicsOptions {
      hierarchy?: any | PolygonHierarchy | Cartesian3[];
      height?: number;
      extrudedHeight?: any | number;
      show?: any | boolean;
      fill?: any | boolean;
      material?: MaterialProperty | Color;
      outline?: boolean;
      outlineColor?: any | Color;
      outlineWidth?: number;
      stRotation?: any | number;
      granularity?: any | number;
      perPositionHeight?: any | boolean;
  }

  class PolylineArrowMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      color: any;

      constructor(color?: any);

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class PolylineGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class PolylineGlowMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      color: any;
      glowPower: any;

      constructor(options?: { color?: any; glowPower?: any });

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  type PolylineGraphicsOptions = {
      positions?: Array<Cartesian3>;
      followSurface?: any;
      width?: number;
      show?: any;
      clampToGround?: boolean;
      material?: MaterialProperty;
      granularity?: any;
      arcType?: number;
      depthFailMaterial?: any;
  };

  class ArcType {
      static GEODESIC: number;
      static NONE: number;
      static RHUMB: number;
  }

  class PolylineGraphics {
      definitionChanged: Event;
      show: any;
      material: MaterialProperty;
      positions: any;
      width: number;
      followSurface: any;
      granularity: any;
      clampToGround: boolean;
      constructor(options?: PolylineGraphicsOptions);

      clone(result?: PolylineGraphics): PolylineGraphics;

      merge(source: PolylineGraphics): void;
  }

  class PolylineOutlineMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      color: any;
      outlineColor: any;
      outlineWidth: any;

      constructor(options?: { color?: any; outlineColor?: any; outlineWidth?: any });

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class PolylineVolumeGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class PolylineVolumeGraphics {
      definitionChanged: Event;
      show: any;
      material: MaterialProperty;
      positions: any;
      shape: any;
      granularity: any;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;
      cornerType: any;

      constructor(options?: { positions?: any; shape?: any; cornerType?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; granularity?: any });

      clone(result?: PolylineVolumeGraphics): PolylineVolumeGraphics;

      merge(source: PolylineVolumeGraphics): void;
  }

  interface PositionProperty {
      readonly isConstant: boolean;
      readonly definitionChanged: Event;
      referenceFrame: ReferenceFrame;

      equals(other: any): boolean;

      getValue(time: JulianDate, result?: Cartesian3): Cartesian3;

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3;
  }

  class PositionPropertyArray {
      isConstant: boolean;
      definitionChanged: Event;
      referenceFrame: ReferenceFrame;

      constructor(value?: any[]);

      getValue(time?: JulianDate, result?: Cartesian3[]): Cartesian3[];

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3;

      setValue(value: any[]): void;

      equals(other?: any): boolean;
  }

  class Property {
      isConstant: boolean;
      definitionChanged: Event;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class PropertyArray {
      isConstant: boolean;
      definitionChanged: Event;

      constructor(value?: any[]);

      getValue(time?: JulianDate, result?: any[]): any[];

      setValue(value: any[]): void;

      equals(other?: any): boolean;
  }

  interface ObjectLike {
      [key: string]: any;
  }

  type PropertyBag = ObjectLike & {
      constructor(value?: object, createPropertyCallback?: Function): PropertyBag;
      definitionChanged: Event;
      isConstant: boolean;
      propertyNames: string[];
      addProperty(propertyName: string, value?: any, createPropertyCallback?: Function): void;
      getValue(time: JulianDate, result?: Object): Object;
      hasProperty(propertyName: string): boolean;
      merge(source: Object, createPropertyCallback?: Function): void;
      removeProperty(propertyName: string): void;
  }

  class RectangleGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class RectangleGraphics {
      definitionChanged: Event;
      show: any;
      coordinates: any;
      material: MaterialProperty;
      height: any;
      extrudedHeight: any;
      granularity: any;
      stRotation: any;
      rotation: any;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;
      closeTop: any;
      closeBottom: any;

      constructor(options?: { coordinates?: any; height?: any; extrudedHeight?: any; closeTop?: any; closeBottom?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; rotation?: any; stRotation?: any; granularity?: any });

      clone(result?: RectangleGraphics): RectangleGraphics;

      merge(source: RectangleGraphics): void;
  }

  class ReferenceProperty {
      isConstant: boolean;
      definitionChanged: Event;
      referenceFrame: ReferenceFrame;
      targetId: string;
      targetCollection: EntityCollection;
      targetPropertyNames: string[];
      resolvedProperty: any;

      constructor(targetCollection: EntityCollection, targetId: string, targetPropertyNames: string);

      getValue(time: JulianDate, result?: any): any;

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3;

      getType(time: JulianDate): string;

      equals(other?: any): boolean;

      static fromString(targetCollection: Entity, referenceString: string): ReferenceProperty;
  }

  class SampledPositionProperty {
      isConstant: boolean;
      definitionChanged: Event;
      referenceFrame: ReferenceFrame;
      interpolationDegree: number;
      interpolationAlgorithm: InterpolationAlgorithm;
      numberOfDerivatives: boolean;
      forwardExtrapolationType: ExtrapolationType;
      forwardExtrapolationDuration: number;
      backwardExtrapolationType: ExtrapolationType;
      backwardExtrapolationDuration: number;

      constructor(referenceFrame?: ReferenceFrame, numberOfDerivatives?: number);

      getValue(time: JulianDate, result?: Cartesian3): Cartesian3;

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3;

      setInterpolationOptions(options?: { interpolationAlgorithm?: InterpolationAlgorithm; interpolationDegree?: number }): void;

      addSample(time: JulianDate, position: Cartesian3, derivatives?: Cartesian3[]): void;

      addSamples(times: JulianDate[], positions: Cartesian3[], derivatives?: any[][]): void;

      addSamplesPackedArray(packedSamples: number[], epoch?: JulianDate): void;

      equals(other?: any): boolean;
  }

  class SampledProperty {
      isConstant: boolean;
      definitionChanged: Event;
      type: any;
      derivativeTypes: Packable[];
      interpolationDegree: number;
      interpolationAlgorithm: InterpolationAlgorithm;
      forwardExtrapolationType: ExtrapolationType;
      forwardExtrapolationDuration: number;
      backwardExtrapolationType: ExtrapolationType;
      backwardExtrapolationDuration: number;

      constructor(type: number | Packable, derivativeTypes?: Packable[]);

      getValue(time: JulianDate, result?: any): any;

      setInterpolationOptions(options?: { interpolationAlgorithm?: InterpolationAlgorithm; interpolationDegree?: number }): void;

      addSample(time: JulianDate, value: Packable, derivatives?: Packable[]): void;

      addSamples(times: JulianDate[], values: Packable[], derivativeValues?: any[][]): void;

      addSamplesPackedArray(packedSamples: number[], epoch?: JulianDate): void;

      equals(other?: any): boolean;
  }

  class StripeMaterialProperty {
      isConstant: boolean;
      definitionChanged: Event;
      orientation: any;
      evenColor: Color;
      oddColor: Color;
      offset: any;
      repeat: number;

      constructor(options?: { evenColor?: any; oddColor?: any; repeat?: any; offset?: any; orientation?: any });

      getType(time: JulianDate): string;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class TimeIntervalCollectionPositionProperty {
      isConstant: boolean;
      definitionChanged: Event;
      intervals: TimeIntervalCollection;
      referenceFrame: ReferenceFrame;

      constructor(referenceFrame?: ReferenceFrame);

      getValue(time: JulianDate, result?: any): any;

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3;

      equals(other?: any): boolean;
  }

  class TimeIntervalCollectionProperty {
      isConstant: boolean;
      definitionChanged: Event;
      intervals: TimeIntervalCollection;

      getValue(time: JulianDate, result?: any): any;

      equals(other?: any): boolean;
  }

  class VelocityOrientationProperty {
      isConstant: boolean;
      definitionChanged: Event;
      position: any;
      ellipsoid: any;

      constructor(position?: any, ellipsoid?: Ellipsoid);

      getValue(time?: JulianDate, result?: Quaternion): Quaternion;

      equals(other?: any): boolean;
  }

  class Visualizer {
      update(time: JulianDate): boolean;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class WallGeometryUpdater {
      entity: Entity;
      fillEnabled: boolean;
      hasConstantFill: boolean;
      fillMaterialProperty: MaterialProperty;
      outlineEnabled: boolean;
      hasConstantOutline: boolean;
      outlineColorProperty: any;
      outlineWidth: number;
      isDynamic: boolean;
      isClosed: boolean;
      geometryChanged: boolean;
      static perInstanceColorAppearanceType: Appearance;
      static materialAppearanceType: Appearance;

      constructor(entity: Entity, scene: Scene);

      isOutlineVisible(time: JulianDate): boolean;

      isFilled(time: JulianDate): boolean;

      createFillGeometryInstance(time: JulianDate): GeometryInstance;

      createOutlineGeometryInstance(time: JulianDate): GeometryInstance;

      isDestroyed(): boolean;

      destroy(): void;

      createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater;
  }

  class WallGraphics {
      definitionChanged: Event;
      show: any;
      material: MaterialProperty;
      positions: any;
      minimumHeights: any;
      maximumHeights: any;
      granularity: any;
      fill: any;
      outline: any;
      outlineColor: any;
      outlineWidth: any;

      constructor(options?: { positions?: any; maximumHeights?: any; minimumHeights?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; granularity?: any });

      clone(result?: WallGraphics): WallGraphics;

      merge(source: WallGraphics): void;
  }

  class Appearance {
      material: Material;
      translucent: boolean;
      vertexShaderSource: string;
      fragmentShaderSource: string;
      renderState: any;
      closed: boolean;

      constructor(options?: { translucent?: boolean; closed?: boolean; material?: Material; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      getFragmentShaderSource(): string;

      isTranslucent(): boolean;

      getRenderState(): any;
  }

  class ArcGisMapServerImageryProvider extends ImageryProvider {
      url: string;
      proxy: Proxy;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      rectangle: Rectangle;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      ready: boolean;
      credit: Credit;
      usingPrecachedTiles: boolean;
      hasAlphaChannel: boolean;

      constructor(options: { url: string; tileDiscardPolicy?: TileDiscardPolicy; proxy?: Proxy; usePreCachedTilesIfAvailable?: boolean; enablePickFeatures?: boolean; rectangle?: Rectangle; tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; tileWidth?: number; tileHeight?: number; maximumLevel?: number }, layers?: string);

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;
  }

  class Billboard {
      show: boolean;
      position: Cartesian3;
      pixelOffset: Cartesian2;
      scaleByDistance: NearFarScalar;
      translucencyByDistance: NearFarScalar;
      pixelOffsetScaleByDistance: NearFarScalar;
      eyeOffset: Cartesian3;
      horizontalOrigin: HorizontalOrigin;
      verticalOrigin: VerticalOrigin;
      scale: number;
      color: Color;
      rotation: number;
      alignedAxis: Cartesian3;
      width: number;
      height: number;
      id: any;
      image: string;
      ready: boolean;

      setImage(id: string, image: HTMLImageElement | HTMLCanvasElement | string | Billboard.CreateImageCallback): void;

      setImageSubRegion(id: string, subRegion: BoundingRectangle): void;

      computeScreenSpacePosition(scene: Scene, result?: Cartesian2): Cartesian2;

      equals(other: Billboard): boolean;
  }

  module Billboard {
      type CreateImageCallback = (id: string) => HTMLImageElement | HTMLCanvasElement | Promise<HTMLImageElement | HTMLCanvasElement>;
  }

  class BillboardCollection {
      modelMatrix: Matrix4;
      debugShowBoundingVolume: boolean;
      length: number;

      constructor(options?: { modelMatrix?: Matrix4; debugShowBoundingVolume?: boolean });

      add(billboard?: any): Billboard;

      remove(billboard: Billboard): boolean;

      removeAll(): void;

      contains(billboard?: Billboard): boolean;

      get(index: number): Billboard;

      update(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class BingMapsImageryProvider extends ImageryProvider {
      defaultGamma: number;
      url: string;
      proxy: Proxy;
      key: string;
      mapStyle: BingMapsStyle;
      culture: string;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      rectangle: Rectangle;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      ready: boolean;
      credit: Credit;
      hasAlphaChannel: boolean;

      constructor(options: { url: string; key?: string; tileProtocol?: string; mapStyle?: string; culture?: string; ellipsoid?: Ellipsoid; tileDiscardPolicy?: TileDiscardPolicy; proxy?: Proxy });

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;

      static tileXYToQuadKey(x: number, y: number, level: number): string;

      static quadKeyToTileXY(quadkey: string): { x: number, y: number, level: number };
  }

  class BingMapsApi {
      static defaultKey: string;
  }

  class EasingFunction {
      static BACK_IN: Function;
      static BACK_IN_OUT: Function;
      static BACK_OUT: Function;
      static BOUNCE_IN: Function;
      static BOUNCE_IN_OUT: Function;
      static BOUNCE_OUT: Function;
      static CIRCULAR_IN: Function;
      static CIRCULAR_IN_OUT: Function;
      static CIRCULAR_OUT: Function;
      static CUBIC_IN: Function;
      static CUBIC_IN_OUT: Function;
      static CUBIC_OUT: Function;
      static ELASTIC_IN: Function;
      static ELASTIC_IN_OUT: Function;
      static ELASTIC_OUT: Function;
      static EXPONENTIAL_IN: Function;
      static EXPONENTIAL_IN_OUT: Function;
      static EXPONENTIAL_OUT: Function;
      static LINEAR_NONE: Function;
      static QUADRACTIC_IN: Function;
      static QUADRACTIC_IN_OUT: Function;
      static QUADRACTIC_OUT: Function;
      static QUARTIC_IN: Function;
      static QUARTIC_IN_OUT: Function;
      static QUARTIC_OUT: Function;
      static QUINTIC_IN: Function;
      static QUINTIC_IN_OUT: Function;
      static QUINTIC_OUT: Function;
      static SINUSOIDAL_IN: Function;
      static SINUSOIDAL_IN_OUT: Function;
      static SINUSOIDAL_OUT: Function;
  }

  class Camera {
      position: Cartesian3;
      direction: Cartesian3;
      up: Cartesian3;
      right: Cartesian3;
      frustum: OrthographicFrustum;
      defaultMoveAmount: number;
      defaultLookAmount: number;
      defaultRotateAmount: number;
      defaultZoomAmount: number;
      constrainedAxis: Cartesian3;
      maximumTranslateFactor: number;
      maximumZoomFactor: number;
      readonly transform: Matrix4;
      readonly inverseTransform: Matrix4;
      readonly viewMatrix: Matrix4;
      readonly inverseViewMatrix: Matrix4;
      readonly positionCartographic: Cartographic;
      readonly positionWC: Cartesian3;
      readonly directionWC: Cartesian3;
      readonly upWC: Cartesian3;
      readonly rightWC: Cartesian3;
      readonly heading: number;
      readonly pitch: number;
      readonly roll: number;
      readonly moveStart: Event;
      readonly moveEnd: Event;
      readonly changed: Event;
      percentageChanged: number;
      static DEFAULT_OFFSET: HeadingPitchRange;
      static DEFAULT_VIEW_RECTANGLE: Rectangle;
      static DEFAULT_VIEW_FACTOR: number;

      constructor(scene: Scene);

      setView(options: { destination?: Cartesian3 | Rectangle, orientation?: Object, endTransform?: Matrix4 }): void;

      worldToCameraCoordinates(cartesian: Cartesian4, result?: Cartesian4): Cartesian4;

      worldToCameraCoordinatesPoint(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      worldToCameraCoordinatesVector(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      cameraToWorldCoordinates(cartesian: Cartesian4, result?: Cartesian4): Cartesian4;

      cameraToWorldCoordinatesPoint(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      cameraToWorldCoordinatesVector(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;

      move(direction: Cartesian3, amount?: number): void;

      moveForward(amount?: number): void;

      moveBackward(amount?: number): void;

      moveUp(amount?: number): void;

      moveDown(amount?: number): void;

      moveRight(amount?: number): void;

      moveLeft(amount?: number): void;

      lookLeft(amount?: number): void;

      lookRight(amount?: number): void;

      lookUp(amount?: number): void;

      lookDown(amount?: number): void;

      look(axis: Cartesian3, angle?: number): void;

      twistLeft(amount?: number): void;

      twistRight(amount?: number): void;

      rotate(axis: Cartesian3, angle?: number): void;

      rotateDown(angle?: number): void;

      rotateUp(angle?: number): void;

      rotateRight(angle?: number): void;

      rotateLeft(angle?: number): void;

      zoomIn(amount?: number): void;

      zoomOut(amount?: number): void;

      getMagnitude(): number;

      lookAt(target: Cartesian3, offset: Cartesian3 | HeadingPitchRange): void;

      lookAtTransform(transform: Matrix4, offset: Cartesian3 | HeadingPitchRange): void;

      getRectangleCameraCoordinates(rectangle: Rectangle, result?: Cartesian3): Cartesian3;

      computeViewRectangle(ellipsoid?: Ellipsoid, result?: Rectangle): Rectangle | undefined;

      pickEllipsoid(windowPosition: Cartesian2, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3;

      getPickRay(windowPosition: Cartesian2, result?: Ray): any;

      flyTo(options: {
          destination: Cartesian3 | Rectangle;
          orientation?: any;
          duration?: number;
          complete?: () => void;
          cancel?: () => void;
          endTransform?: Matrix4;
          easingFunction?: EasingFunction;
          maximumHeight?: number;
          pitchAdjustHeight?: number;
          flyOverLongitude?: number;
          flyOverLongitudeWeight?: number
      }): void;

      viewBoundingSphere(boundingSphere: BoundingSphere, offset?: HeadingPitchRange): void;

      flyToBoundingSphere(boundingSphere: BoundingSphere, options?: {
          duration?: number;
          offset?: HeadingPitchRange;
          complete?: () => void;
          cancel?: () => void;
          endTransform?: Matrix4;
          easingFunction?: EasingFunction;
          maximumHeight?: number;
          pitchAdjustHeight?: number;
          flyOverLongitude?: number;
          flyOverLongitudeWeight?: number
      }): void;

      clone(): Camera;

      cancelFlight(): void;

      distanceToBoundingSphere(boundingSphere: BoundingSphere): number;

      flyHome(duration?: number): void;

      switchToOrthographicFrustum(): void;

      switchToPerspectiveFrustum(): void;

  }

  class CameraEventAggregator {
      currentMousePosition: Cartesian2;
      anyButtonDown: boolean;

      constructor(element?: HTMLCanvasElement);

      isMoving(type: CameraEventType, modifier?: KeyboardEventModifier): boolean;

      getMovement(type: CameraEventType, modifier?: KeyboardEventModifier): any;

      getLastMovement(type: CameraEventType, modifier?: KeyboardEventModifier): any;

      isButtonDown(type: CameraEventType, modifier?: KeyboardEventModifier): boolean;

      getStartMousePosition(type: CameraEventType, modifier?: KeyboardEventModifier): Cartesian2;

      getButtonPressTime(type: CameraEventType, modifier?: KeyboardEventModifier): Date;

      getButtonReleaseTime(type: CameraEventType, modifier?: KeyboardEventModifier): Date;

      reset(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class CreditDisplay {
      constructor(container: HTMLElement, delimiter?: string);

      addCredit(credit: Credit): void;

      addDefaultCredit(credit: Credit): void;

      removeDefaultCredit(credit: Credit): void;

      beginFrame(credit: Credit): void;

      endFrame(credit: Credit): void;

      destroy(): void;

      isDestroyed(): boolean;
  }

  class CullingVolume {
      planes: Cartesian4[];

      constructor(planes: Cartesian4[]);

      computeVisibility(boundingVolume: any): Intersect;
  }

  class DebugAppearance {
      material: Material;
      translucent: boolean;
      vertexShaderSource: string;
      fragmentShaderSource: string;
      renderState: any;
      closed: boolean;
      attributeName: string;
      glslDatatype: string;

      constructor(options: { attributeName: string; glslDatatype?: string; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      getFragmentShaderSource(): string;

      isTranslucent(): boolean;

      getRenderState(): any;
  }

  class DebugModelMatrixPrimitive {
      length: number;
      width: number;
      show: boolean;
      modelMatrix: Matrix4;
      id: any;

      constructor(options?: { length?: number; width?: number; modelMatrix?: Matrix4; show?: boolean; id?: any });

      isDestroyed(): boolean;

      destroy(): void;
  }

  class DiscardMissingTileImagePolicy {
      constructor(options: { missingImageUrl: string; pixelsToCheck: Cartesian2[]; disableCheckIfAllPixelsAreTransparent?: boolean });

      isReady(): boolean;

      shouldDiscardImage(image: HTMLImageElement): boolean;
  }

  class EllipsoidPrimitive {
      center: Cartesian3;
      radii: Cartesian3;
      modelMatrix: Matrix4;
      show: boolean;
      material: Material;
      id: any;
      debugShowBoundingVolume: boolean;

      constructor(options?: { center?: Cartesian3; radii?: Cartesian3; modelMatrix?: Matrix4; show?: boolean; material?: Material; id?: any; debugShowBoundingVolume?: boolean });

      update(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class EllipsoidSurfaceAppearance {
      material: Material;
      translucent: boolean;
      vertexShaderSource: string;
      fragmentShaderSource: string;
      renderState: any;
      closed: boolean;
      vertexFormat: VertexFormat;
      flat: boolean;
      faceForward: boolean;
      aboveGround: boolean;
      static VERTEX_FORMAT: VertexFormat;

      constructor(options?: { flat?: boolean; faceForward?: boolean; translucent?: boolean; aboveGround?: boolean; material?: Material; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      getFragmentShaderSource(): void;

      isTranslucent(): boolean;

      getRenderState(): any;
  }

  class FrameRateMonitor {
      samplingWindow: number;
      quietPeriod: number;
      warmupPeriod: number;
      minimumFrameRateDuringWarmup: number;
      minimumFrameRateAfterWarmup: number;
      scene: Scene;
      lowFrameRate: Event;
      nominalFrameRate: Event;
      lastFramesPerSecond: number;
      static defaultSettings: Object;

      constructor(options?: { scene: Scene; samplingWindow?: number; quietPeriod?: number; warmupPeriod?: number; minimumFrameRateDuringWarmup?: number; minimumFrameRateAfterWarmup?: number });

      pause(): void;

      unpause(): void;

      isDestroyed(): boolean;

      destroy(): void;

      static fromScene(scene: Scene): FrameRateMonitor;
  }

  class GetFeatureInfoFormat {
      constructor(type: string, format?: string);
  }

  class Globe {
      baseColor: Color;
      depthTestAgainstTerrain: boolean;
      ellipsoid: Ellipsoid;
      enableLighting: boolean;
      imageryLayers: ImageryLayerCollection;
      lightingFadeInDistance: number;
      lightingFadeOutDistance: number;
      maximumScreenSpaceError: number;
      oceanNormalMapUrl: string;
      shadows: ShadowMode;
      show: boolean;
      showWaterEffect: boolean;
      terrainProvider: TerrainProvider;
      readonly terrainProviderChanged: Event;
      tileCacheSize: number;
      tileLoadProgressEvent: Event;
      material: Material;

      constructor(ellipsoid?: Ellipsoid);

      pick(ray: Ray, scene: Scene, result?: Cartesian3): Cartesian3;

      getHeight(cartographic: Cartographic): number;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class GoogleEarthEnterpriseMapsProvider {
      constructor(options: { url: string; channel: number; path?: string; maximumLevel?: number; tileDiscardPolicy?: TileDiscardPolicy; ellipsoid?: Ellipsoid; proxy?: Proxy });

      readonly channel: number;
      readonly credit: Credit;
      defaultGamma: number;
      readonly errorEvent: Event;
      readonly hasAlphaChannel: boolean;
      readonly maximumLevel: number;
      readonly minimumLevel: number;
      readonly path: string;
      readonly proxy: Proxy;
      readonly ready: boolean;
      readonly readyPromise: Promise<boolean>;
      readonly rectangle: Rectangle;
      readonly requestType: string;
      readonly tileDiscardPolicy: TileDiscardPolicy;
      readonly tileHeight: number;
      readonly tileWidth: number;
      readonly tilingScheme: TilingScheme;
      readonly url: string;
      readonly version: number;

      getTileCredits(x: number, y: number, level: number): Credit[];

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;
  }

  class GoogleEarthEnterpriseImageryProvider extends ImageryProvider {
      defaultGamma: number;
      url: string;
      path: string;
      proxy: Proxy;
      channel: number;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      version: number;
      requestType: string;
      rectangle: Rectangle;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      ready: boolean;
      credit: Credit;
      hasAlphaChannel: boolean;

      constructor(options: { url: string; proxy?: Proxy; ellipsoid?: Ellipsoid; tileDiscardPolicy?: TileDiscardPolicy; credit?: Credit | string; });

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;
  }

  class GridImageryProvider extends ImageryProvider {
      proxy: Proxy;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      rectangle: Rectangle;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      ready: boolean;
      credit: Credit;
      hasAlphaChannel: boolean;

      constructor(options?: {
          tilingScheme?: TilingScheme;
          ellipsoid?: Ellipsoid;
          cells?: number;
          color?: Color;
          glowColor?: Color;
          glowWidth?: number;
          tileWidth?: number;
          tileHeight?: number;
          canvasSize?: number;
          backgroundColor?: Color;
      });

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;
  }

  class HeadingPitchRange {

      constructor(heading?: number, pitch?: number, roll?: number);

      static clone(hpr: HeadingPitchRange, result?: HeadingPitchRange): HeadingPitchRange;
  }


  class HeadingPitchRoll {
      heading: number;
      pitch: number;
      roll: number;

      constructor(heading?: number, pitch?: number, range?: number);

      toString(): string;

      static clone(headingPitchRoll: HeadingPitchRoll, result?: HeadingPitchRoll): HeadingPitchRoll;

      static equals(left?: HeadingPitchRoll, right?: HeadingPitchRoll): boolean;

      static equalsEpsilon(left?: HeadingPitchRoll, right?: HeadingPitchRoll, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;

      static fromDegrees(heading: number, pitch: number, roll: number, result?: HeadingPitchRoll): HeadingPitchRoll;

      static fromQuaternion(quaternion: Quaternion, result?: HeadingPitchRoll): HeadingPitchRoll;

      clone(result?: HeadingPitchRoll): HeadingPitchRoll;

      equals(right?: HeadingPitchRoll): boolean;

      equalsEpsilon(right?: HeadingPitchRoll, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
  }

  class ImageryLayer {
      alpha: number;
      brightness: number;
      contrast: number;
      gamma: number;
      hue: number;
      readonly imageryProvider: ImageryProvider;
      magnificationFilter: number;
      minificationFilter: number;
      readonly rectangle: Rectangle;
      saturation: number;
      show: boolean;
      splitDirection: number;
      static DEFAULT_BRIGHTNESS: number;
      static DEFAULT_CONTRAST: number;
      static DEFAULT_GAMMA: number;
      static DEFAULT_HUE: number;
      static DEFAULT_MAGNIFICATION_FILTER: number;
      static DEFAULT_MINIFICATION_FILTER: number;
      static DEFAULT_SATURATION: number;
      static DEFAULT_SPLIT: number;

      constructor(imageryProvider: ImageryProvider, options?: {
          rectangle?: Rectangle;
          alpha?: number | Function;
          brightness?: number | Function;
          contrast?: number | Function;
          hue?: number | Function;
          saturation?: number | Function;
          gamma?: number | Function;
          splitDirection?: number | Function;
          minificationFilter?: number;
          magnificationFilter?: number;
          show?: boolean;
          maximumAnisotropy?: number;
          minimumTerrainLevel?: number;
          maximumTerrainLevel?: number
      });

      getViewableRectangle(): Promise<Rectangle>;

      isBaseLayer(): boolean;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class TextureMagnificationFilter {
      static LINEAR: number;
      static NEAREST: number;
  }

  class ImagerySplitDirection {
      static LEFT: number;
      static NONE: number;
      static RIGHT: number;
  }

  class ImageryLayerCollection {
      layerAdded: Event;
      layerRemoved: Event;
      layerMoved: Event;
      layerShownOrHidden: Event;
      length: number;

      add(layer: ImageryLayer, index?: number): void;

      addImageryProvider(imageryProvider: ImageryProvider, index?: number): ImageryLayer;

      remove(layer: ImageryLayer, destroy?: boolean): boolean;

      removeAll(destroy?: boolean): void;

      contains(layer: ImageryLayer): boolean;

      indexOf(layer: ImageryLayer): number;

      get(index: number): ImageryLayer;

      raise(layer: ImageryLayer): void;

      lower(layer: ImageryLayer): void;

      raiseToTop(layer: ImageryLayer): void;

      lowerToBottom(layer: ImageryLayer): void;

      pickImageryLayerFeatures(ray: Ray, scene: Scene): Promise<ImageryLayerFeatureInfo[]>;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class ImageryLayerFeatureInfo {
      name: string;
      description: string;
      position: Cartographic;
      data: any;

      configureNameFromProperties(properties: any): void;

      configureDescriptionFromProperties(properties: any): void;
  }

  class ImageryProvider {
      defaultAlpha: number;
      defaultBrightness: number;
      defaultContrast: number;
      defaultHue: number;
      defaultSaturation: number;
      defaultGamma: number;
      ready: boolean;
      rectangle: Rectangle;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      credit: Credit;
      proxy: Proxy;
      hasAlphaChannel: boolean;

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;

      static loadImage(url: string): Promise<HTMLImageElement | HTMLCanvasElement>;
  }

  class Label {
      show: boolean;
      position: Cartesian3;
      text: string;
      font: string;
      fillColor: Color;
      outlineColor: Color;
      outlineWidth: number;
      style: LabelStyle;
      pixelOffset: Cartesian2;
      translucencyByDistance: NearFarScalar;
      pixelOffsetScaleByDistance: NearFarScalar;
      eyeOffset: Cartesian3;
      horizontalOrigin: HorizontalOrigin;
      verticalOrigin: VerticalOrigin;
      scale: number;
      id: any;

      computeScreenSpacePosition(scene: Scene, result?: Cartesian2): Cartesian2;

      equals(other: Label): boolean;

      isDestroyed(): boolean;
  }

  class LabelCollection {
      modelMatrix: Matrix4;
      debugShowBoundingVolume: boolean;
      length: number;

      constructor(options?: { modelMatrix?: Matrix4; debugShowBoundingVolume?: boolean });

      add(options?: any): Label;

      remove(label: Label): boolean;

      removeAll(): void;

      contains(label: Label): boolean;

      get(index: number): Label;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class Material {
      type: string;
      shaderSource: string;
      materials: any;
      uniforms: any;
      translucent: boolean | Function;
      static DefaultImageId: string;
      static DefaultCubeMapId: string;
      static ColorType: string;
      static ImageType: string;
      static DiffuseMapType: string;
      static AlphaMapType: string;
      static SpecularMapType: string;
      static EmissionMapType: string;
      static BumpMapType: string;
      static NormalMapType: string;
      static GridType: string;
      static StripeType: string;
      static CheckerboardType: string;
      static DotType: string;
      static WaterType: string;
      static RimLightingType: string;
      static FadeType: string;
      static PolylineArrowType: string;
      static PolylineGlowType: string;
      static PolylineOutlineType: string;

      constructor(options?: { strict?: boolean; translucent?: boolean | Function; fabric: any });

      isTranslucent(): boolean;

      isDestroyed(): boolean;

      destroy(): void;

      static fromType(type: string, uniforms?: any): Material;
  }

  class MaterialAppearance {
      material: Material;
      translucent: boolean;
      vertexShaderSource: string;
      fragmentShaderSource: string;
      renderState: any;
      closed: boolean;
      materialSupport: MaterialAppearance.MaterialSupport;
      vertexFormat: VertexFormat;
      flat: boolean;
      faceForward: boolean;

      constructor(options?: { flat?: boolean; faceForward?: boolean; translucent?: boolean; closed?: boolean; materialSupport?: MaterialAppearance.MaterialSupport; material?: Material; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      getFragmentShaderSource(): string;

      isTranslucent(): boolean;

      getRenderState(): any;
  }

  module MaterialAppearance {
      class MaterialSupport {
          static BASIC: number;
          static TEXTURED: number;
          static ALL: number;
      }
  }

  class Model {
      activeAnimations: ModelAnimationCollection;
      readonly allowPicking: boolean;
      readonly readonlyasynchronous: boolean;
      readonly basePath: string;
      readonly boundingSphere: BoundingSphere;
      clampAnimations: boolean;
      color: Color;
      colorBlendAmount: number;
      colorBlendMode: ColorBlendMode;
      debugShowBoundingVolume: boolean;
      debugWireframe: boolean;
      readonly gltf: any;
      id: any;
      readonly incrementallyLoadTextures: boolean;
      maximumScale: number;
      minimumPixelSize: number;
      modelMatrix: Matrix4;
      readonly pendingTextureLoads: number;
      readonly ready: boolean;
      readonly readyPromise: Promise<Model>;
      scale: number;
      shadows: ShadowMode;
      show: boolean;
      silhouetteColor: Color;
      silhouetteSize: number;

      constructor(options?: {
          gltf?: any;
          basePath?: string;
          show?: boolean;
          modelMatrix?: Matrix4;
          scale?: number;
          minimumPixelSize?: number;
          maximumScale?: number;
          id?: any;
          allowPicking?: boolean;
          incrementallyLoadTextures?: boolean;
          asynchronous?: boolean;
          clampAnimations?: boolean;
          shadows?: ShadowMode;
          debugShowBoundingVolume?: boolean;
          debugWireframe?: boolean;
          heightReference?: HeightReference;
          scene?: Scene;
          distanceDisplayCondition?: DistanceDisplayCondition;
          color?: Color;
          colorBlendMode?: ColorBlendMode;
          colorBlendAmount?: number;
          silhouetteColor?: Color;
          silhouetteSize?: number;
      });

      static fromGltf(options?: {
          url?: string;
          headers?: any;
          basePath?: string;
          show?: boolean;
          modelMatrix?: Matrix4;
          scale?: number;
          minimumPixelSize?: number;
          maximumScale?: number;
          id?: any;
          allowPicking?: boolean;
          incrementallyLoadTextures?: boolean;
          asynchronous?: boolean;
          clampAnimations?: boolean;
          shadows?: ShadowMode;
          debugShowBoundingVolume?: boolean;
          debugWireframe?: boolean;
      }): Model;

      static silhouetteSupported(scene: Scene): boolean;

      getMesh(name: string): ModelMesh;

      getNode(name: string): ModelNode;

      getMaterial(name: string): ModelMaterial;

      update(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class ColorBlendMode { }

  class ModelAnimation {
      removeOnStop: boolean;
      start: Event;
      update: Event;
      stop: Event;
      name: string;
      startTime: JulianDate;
      delay: number;
      stopTime: JulianDate;
      speedup: number;
      reverse: boolean;
      loop: ModelAnimationLoop;
  }

  class ModelAnimationCollection {
      animationAdded: Event;
      animationRemoved: Event;
      readonly length: number;

      add(options: {
          name: string;
          index?: number;
          startTime?: JulianDate;
          delay?: number;
          stopTime?: JulianDate;
          removeOnStop?: boolean;
          speedup?: number;
          reverse?: boolean;
          loop?: ModelAnimationLoop;
      }): ModelAnimation;

      addAll(options?: {
          startTime?: JulianDate;
          delay?: number;
          stopTime?: JulianDate;
          removeOnStop?: boolean;
          speedup?: number;
          reverse?: boolean;
          loop?: ModelAnimationLoop;
      }): ModelAnimation[];

      contains(animation: ModelAnimation): boolean;

      get(index: number): ModelAnimation;

      remove(animation: ModelAnimation): boolean;

      removeAll(): void;
  }

  class ModelMaterial {
      name: string;
      id: string;

      setValue(name: string, value?: any): void;

      getValue(name: string): any;
  }

  class ModelMesh {
      name: string;
      id: string;
      materials: ModelMaterial[];
  }

  class ModelNode {
      name: string;
      id: string;
      show: boolean;
      matrix: Matrix4;
  }

  class Moon {
      show: boolean;
      textureUrl: string;
      onlySunLighting: boolean;
      ellipsoid: Ellipsoid;

      constructor(options?: { show?: boolean; textureUrl?: string; ellipsoid?: Ellipsoid; onlySunLighting?: boolean });

      isDestroyed(): boolean;

      destroy(): void;
  }

  class NeverTileDiscardPolicy {
      isReady(): boolean;

      shouldDiscardImage(image: HTMLImageElement | Promise<HTMLImageElement>): Promise<boolean>;
  }

  class OpenStreetMapImageryProvider {
      url: string;
      proxy: Proxy;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      rectangle: Rectangle;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      ready: boolean;
      credit: Credit;
      hasAlphaChannel: boolean;

      constructor(options?: { url?: string; fileExtension?: string; proxy?: any; rectangle?: Rectangle; minimumLevel?: number; maximumLevel?: number; ellipsoid?: Ellipsoid; credit?: Credit | string });

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;
  }

  class OrthographicFrustum {
      left: number;
      right: number;
      top: number;
      bottom: number;
      near: number;
      far: number;
      projectionMatrix: Matrix4;

      computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume;

      getPixelSize(drawingBufferDimensions: Cartesian2, distance?: number, result?: Cartesian2): Cartesian2;

      clone(result?: OrthographicFrustum): OrthographicFrustum;

      equals(other?: OrthographicFrustum): boolean;
  }

  class PerInstanceColorAppearance {
      material: Material;
      translucent: boolean;
      vertexShaderSource: string;
      fragmentShaderSource: string;
      renderState: any;
      closed: boolean;
      vertexFormat: VertexFormat;
      flat: boolean;
      faceForward: boolean;
      static VERTEX_FORMAT: VertexFormat;
      static FLAT_VERTEX_FORMAT: VertexFormat;

      constructor(options?: { flat?: boolean; faceForward?: boolean; translucent?: boolean; closed?: boolean; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      getFragmentShaderSource(): void;

      isTranslucent(): boolean;

      getRenderState(): any;
  }

  class PerspectiveFrustum {
      fov: number;
      aspectRatio: number;
      near: number;
      far: number;
      projectionMatrix: Matrix4;
      infiniteProjectionMatrix: Matrix4;
      fovy: number;

      computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume;

      getPixelSize(drawingBufferDimensions: Cartesian2, distance?: number, result?: Cartesian2): Cartesian2;

      clone(result?: PerspectiveFrustum): PerspectiveFrustum;

      equals(other?: PerspectiveFrustum): boolean;
  }

  class PerspectiveOffCenterFrustum {
      left: number;
      right: number;
      top: number;
      bottom: number;
      near: number;
      far: number;
      projectionMatrix: Matrix4;
      infiniteProjectionMatrix: Matrix4;

      computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume;

      getPixelSize(drawingBufferDimensions: Cartesian2, distance?: number, result?: Cartesian2): Cartesian2;

      clone(result?: PerspectiveOffCenterFrustum): PerspectiveOffCenterFrustum;

      equals(other?: PerspectiveOffCenterFrustum): boolean;
  }

  class PointPrimitive {
      show: boolean;
      position: Cartesian3;
      scaleByDistance: NearFarScalar;
      translucencyByDistance: NearFarScalar;
      pixelSize: number;
      color: Color;
      outlineColor: Color;
      outlineWidth: number;
      id: any;

      computeScreenSpacePosition(scene: Scene, result?: Cartesian2): Cartesian2;

      equals(other: PointPrimitive): boolean;
  }

  class PointPrimitiveCollection {
      modelMatrix: Matrix4;
      debugShowBoundingVolume: boolean;
      length: number;

      constructor(options?: {
          modelMatrix?: Matrix4;
          debugShowBoundingVolume?: boolean;
          blendOption?: BlendOption;
      });

      add(pointPrimitive?: any): PointPrimitive;

      remove(pointPrimitive: PointPrimitive): boolean;

      removeAll(): void;

      contains(pointPrimitive?: PointPrimitive): boolean;

      get(index: number): PointPrimitive;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class BlendOption {
      static OPAQUE: number;
      static OPAQUE_AND_TRANSLUCENT: number;
      static TRANSLUCENT: number;
  }

  class Polygon {
      ellipsoid: Ellipsoid;
      granularity: number;
      height: number;
      textureRotationAngle: number;
      show: boolean;
      material: Material;
      id: any;
      asynchronous: boolean;
      debugShowBoundingVolume: boolean;
      positions: Cartesian3[];

      constructor(options?: { ellipsoid?: Ellipsoid; positions?: Cartesian3[]; polygonHierarchy?: any; granularity?: number; height?: number; textureRotationAngle?: number; show?: boolean; material?: Material; id?: any; asynchronous?: boolean; debugShowBoundingVolume?: boolean });

      configureFromPolygonHierarchy(hierarchy: any): void;

      update(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class Polyline {
      show: boolean;
      positions: Cartesian3[];
      material: Material;
      width: number;
      loop: boolean;
      id: any;

      constructor(options?: { show?: boolean; width?: number; loop?: boolean; material?: Material; positions?: Cartesian3[]; id?: any });
  }

  class PolylineCollection {
      modelMatrix: Matrix4;
      debugShowBoundingVolume: boolean;
      length: number;

      constructor(options?: { modelMatrix?: Matrix4; debugShowBoundingVolume?: boolean });

      add(polyline?: any): Polyline;

      remove(polyline: Polyline): boolean;

      removeAll(): void;

      contains(polyline: Polyline): boolean;

      get(index: number): Polyline;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class PolylineColorAppearance {
      material: Material;
      translucent: boolean;
      vertexShaderSource: string;
      fragmentShaderSource: string;
      renderState: any;
      closed: boolean;
      vertexFormat: VertexFormat;
      static VERTEX_FORMAT: VertexFormat;

      constructor(options?: { translucent?: boolean; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      getFragmentShaderSource(): void;

      isTranslucent(): boolean;

      getRenderState(): any;
  }

  class PolylineMaterialAppearance {
      material: Material;
      translucent: boolean;
      vertexShaderSource: string;
      fragmentShaderSource: string;
      renderState: any;
      closed: boolean;
      vertexFormat: VertexFormat;
      static VERTEX_FORMAT: VertexFormat;

      constructor(options?: { translucent?: boolean; material?: Material; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      getFragmentShaderSource(): void;

      isTranslucent(): boolean;

      getRenderState(): any;
  }

  class Primitive {
      readonly allowPicking: boolean;
      readonly asynchronous: boolean;
      readonly compressVertices: boolean;
      readonly geometryInstances: GeometryInstance[] | GeometryInstance;
      readonly interleave: boolean;
      readonly vertexCacheOptimize: boolean;
      readonly releaseGeometryInstances: boolean;
      readonly ready: boolean;
      readonly readyPromise: Promise<Primitive>;
      cull: boolean;
      debugShowBoundingVolume: boolean;
      depthFailAppearance: Appearance;
      modelMatrix: Matrix4;
      shadows: ShadowMode;
      show: boolean;
      appearance: Appearance | any;

      constructor(options?: {
          geometryInstances?: any[] | GeometryInstance;
          appearance?: Appearance | any;
          show?: boolean;
          modelMatrix?: Matrix4;
          vertexCacheOptimize?: boolean;
          interleave?: boolean;
          compressVertices?: boolean;
          releaseGeometryInstances?: boolean;
          allowPicking?: boolean;
          cull?: boolean;
          asynchronous?: boolean;
          debugShowBoundingVolume?: boolean;
          shadows?: ShadowMode;
      });

      update(): void;

      getGeometryInstanceAttributes(id: any): any;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class PrimitiveCollection {
      readonly length: number;
      show: boolean;
      destroyPrimitives: boolean;

      constructor(options?: { show?: boolean; destroyPrimitives?: boolean });

      add(primitive: any): any;

      remove(primitive?: any): boolean;

      removeAll(): void;

      contains(primitive?: any): boolean;

      raise(primitive?: any): void;

      raiseToTop(primitive?: any): void;

      lower(primitive?: any): void;

      lowerToBottom(primitive?: any): void;

      get(index: number): any;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class GroundPrimitive {
      static isSupported: any;
      readonly allowPicking: boolean;
      readonly asynchronous: boolean;
      readonly compressVertices: boolean;
      readonly geometryInstances: any[] | GeometryInstance;
      readonly interleave: boolean;
      readonly vertexCacheOptimize: boolean;
      readonly releaseGeometryInstances: boolean;
      readonly ready: boolean;
      readonly readyPromise: Promise<Primitive>;
      classificationType: any;
      debugShowBoundingVolume: boolean;
      debugShowShadowVolume: boolean;
      show: boolean;

      constructor(options?: {
          geometryInstances?: any[] | GeometryInstance;
          show?: boolean;
          vertexCacheOptimize?: boolean;
          interleave?: boolean;
          compressVertices?: boolean;
          releaseGeometryInstances?: boolean;
          allowPicking?: boolean;
          asynchronous?: boolean;
          classificationType?: any;
          debugShowBoundingVolume?: boolean;
          debugShowShadowVolume?: boolean;
      });

      static initializeTerrainHeights(): Promise<any>;

      destroy(): void;

      getGeometryInstanceAttributes(id: any): any;

      destroy(): boolean;

      update(): void;
  }

  class RectanglePrimitive {
      ellipsoid: Ellipsoid;
      rectangle: Rectangle;
      granularity: number;
      height: number;
      rotation: number;
      textureRotationAngle: number;
      show: boolean;
      material: Material;
      id: any;
      asynchronous: boolean;
      debugShowBoundingVolume: boolean;

      constructor(options?: { ellipsoid?: Ellipsoid; rectangle?: Rectangle; granularity?: number; height?: number; rotation?: number; textureRotationAngle?: number; show?: boolean; material?: Material; id?: any; asynchronous?: boolean; debugShowBoundingVolume?: boolean });

      update(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class Fog {
      density: number;
      enabled: boolean;
      screenSpaceErrorFactor: number;
  }

  class MapMode2D {
      static INFINITE_SCROLL: number;
      static ROTATE: number;
  }

  class Scene {
      backgroundColor: Color;
      readonly camera: Camera;
      readonly canvas: HTMLCanvasElement;
      completeMorphOnUserInput: boolean;
      debugCommandFilter: Function;
      readonly debugFrustumStatistics: any;
      debugShowCommands: boolean;
      debugShowFramesPerSecond: boolean;
      debugShowFrustumPlanes: boolean;
      debugShowFrustums: boolean;
      debugShowGlobeDepth: boolean;
      readonly drawingBufferHeight: number;
      readonly drawingBufferWidth: number;
      eyeSeparation: number;
      farToNearRatio: number;
      focalLength: number;
      fog: Fog;
      fxaa: boolean;
      globe: Globe;
      readonly groundPrimitives: PrimitiveCollection;
      readonly id: string;
      readonly imageryLayers: ImageryLayerCollection;
      imagerySplitPosition: number;
      invertClassification: boolean;
      invertClassificationColor: Color;
      mapMode2D: boolean;
      readonly mapProjection: MapProjection;
      readonly maximumAliasedLineWidth: number;
      readonly maximumCubeMapSize: number;
      minimumDisableDepthTestDistance: number;
      mode: SceneMode;
      moon: Moon;
      morphComplete: Event;
      morphStart: Event;
      morphTime: number;
      nearToFarDistance2D: number;
      readonly orderIndependentTranslucency: boolean;
      readonly pickPositionSupported: boolean;
      pickTranslucentDepth: boolean;
      readonly postRender: Event;
      readonly preRender: Event;
      readonly primitives: PrimitiveCollection;
      readonly renderError: Event;
      rethrowRenderErrors: boolean;
      readonly scene3DOnly: boolean;
      readonly screenSpaceCameraController: ScreenSpaceCameraController;
      shadowMap: ShadowMap;
      skyAtmosphere: SkyAtmosphere;
      skyBox: SkyBox;
      sun: Sun;
      sunBloom: boolean;
      terrainExaggeration: number;
      terrainProvider: TerrainProvider;
      readonly terrainProviderChanged: Event;
      useDepthPicking: boolean;
      useWebVR: boolean;

      constructor(options?: {
          canvas: HTMLCanvasElement;
          contextOptions?: any;
          creditContainer?: Element;
          mapProjection?: MapProjection;
          orderIndependentTranslucency?: boolean;
          scene3DOnly?: boolean,
          terrainExaggeration?: number,
          shadows?: boolean,
          mapMode2D?: MapMode2D
      });

      cartesianToCanvasCoordinates(position: Cartesian3, result?: Cartesian2): Cartesian2;

      completeMorph(): void;

      destroy(): void;

      drillPick(windowPosition: Cartesian2, limit?: number): any[];

      getCompressedTextureFormatSupported(format: string): boolean;

      isDestroyed(): boolean;

      morphTo2D(duration?: number): void;

      morphTo3D(duration?: number): void;

      morphToColumbusView(duration?: number): void;

      pick(windowPosition: Cartesian2, width?: number, height?: number): any;

      pickPosition(windowPosition: Cartesian2, result?: Cartesian3): Cartesian3;

      requestRender(): void;
  }

  class ScreenSpaceCameraController {
      enableInputs: boolean;
      enableTranslate: boolean;
      enableZoom: boolean;
      enableRotate: boolean;
      enableTilt: boolean;
      enableLook: boolean;
      inertiaSpin: number;
      inertiaTranslate: number;
      inertiaZoom: number;
      maximumMovementRatio: number;
      bounceAnimationTime: number;
      minimumZoomDistance: number;
      maximumZoomDistance: number;
      translateEventTypes: CameraEventType | any[];
      zoomEventTypes: CameraEventType | any[];
      rotateEventTypes: CameraEventType | any[];
      tiltEventTypes: CameraEventType | any[];
      lookEventTypes: CameraEventType | any[];
      minimumPickingTerrainHeight: number;
      minimumCollisionTerrainHeight: number;
      minimumTrackBallHeight: number;
      enableCollisionDetection: boolean;

      constructor(scene: Scene);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class ShadowMap {
      darkness: number;
      enabled: boolean;
      maximumDistance: number;
      normalOffset: boolean;
      size: number;
      softShadows: boolean;

      constructor(options: ShadowMapOptions);
  }

  type ShadowMapOptions = {
      lightCamera: Camera;
      cascadesEnabled?: boolean;
      darkness?: number;
      enabled?: boolean;
      isPointLight?: boolean;
      maximumDistance?: number;
      normalOffset?: boolean;
      numberOfCascades?: number;
      pointLightRadius?: number;
      size?: number;
      softShadows?: boolean;
  }

  class SingleTileImageryProvider extends ImageryProvider {
      url: string;
      proxy: Proxy;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      rectangle: Rectangle;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      ready: boolean;
      credit: Credit;
      hasAlphaChannel: boolean;

      constructor(options: { url: string; rectangle?: Rectangle; credit?: Credit | string; ellipsoid?: Ellipsoid; proxy?: any });

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;
  }

  class SkyAtmosphere {
      brightnessShift: number;
      hueShift: number;
      saturationShift: number;
      show: boolean;
      readonly ellipsoid: Ellipsoid;

      constructor(ellipsoid?: Ellipsoid);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class SkyBox {
      sources: any;
      show: boolean;

      constructor(options: { sources?: any; show?: boolean });

      update(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class Sun {
      show: boolean;
      glowFactor: number;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class TileCoordinatesImageryProvider {
      proxy: Proxy;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      rectangle: Rectangle;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      ready: boolean;
      credit: Credit;
      hasAlphaChannel: boolean;

      constructor(options?: { tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; color?: Color; tileWidth?: number; tileHeight?: number });

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;
  }

  class TileDiscardPolicy {
      isReady(): boolean;

      shouldDiscardImage(image: HTMLImageElement | Promise<HTMLImageElement>): Promise<boolean>;
  }

  class TileMapServiceImageryProvider extends ImageryProvider {
      readonly url: string;
      readonly proxy: Proxy;
      readonly tileWidth: number;
      readonly tileHeight: number;
      readonly maximumLevel: number;
      readonly minimumLevel: number;
      readonly tilingScheme: TilingScheme;
      readonly rectangle: Rectangle;
      readonly tileDiscardPolicy: TileDiscardPolicy;
      readonly errorEvent: Event;
      readonly ready: boolean;
      readonly readyPromise: Promise<boolean>
      readonly credit: Credit;
      readonly hasAlphaChannel: boolean;

      constructor(options?: { url?: string; fileExtension?: string; proxy?: any; credit?: Credit | string; minimumLevel?: number; maximumLevel?: number; rectangle?: Rectangle; tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; tileWidth?: number; tileHeight?: number });

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;
  }

  class ViewportQuad {
      show: boolean;
      rectangle: BoundingRectangle;
      material: Material;

      constructor(rectangle?: BoundingRectangle, material?: Material);

      update(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class WebMapServiceImageryProvider extends ImageryProvider {
      url: string;
      proxy: Proxy;
      layers: string;
      tileWidth: number;
      tileHeight: number;
      maximumLevel: number;
      minimumLevel: number;
      tilingScheme: TilingScheme;
      rectangle: Rectangle;
      tileDiscardPolicy: TileDiscardPolicy;
      errorEvent: Event;
      ready: boolean;
      readyPromise: Promise<boolean>;
      credit: Credit;
      hasAlphaChannel: boolean;
      static DefaultParameters: Object;
      static GetFeatureInfoDefaultParameters: Object;

      constructor(options: { url: string; layers: string; parameters?: any; getFeatureInfoParameters?: any; enablePickFeatures?: boolean; getFeatureInfoFormats?: GetFeatureInfoFormat[]; rectangle?: Rectangle; tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; tileWidth?: number; tileHeight?: number; minimumLevel?: number; maximumLevel?: number; credit?: Credit | string; proxy?: any });

      getTileCredits(x: number, y: number, level: number): Credit[];

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;
  }

  class WebMapTileServiceImageryProvider extends ImageryProvider {
      clock: Clock;
      readonly credit: Credit;
      dimensions: any;
      readonly errorEvent: Event;
      readonly format: string;
      readonly hasAlphaChannel: boolean;
      readonly maximumLevel: number;
      readonly minimumLevel: number;
      readonly proxy: Proxy;
      readonly ready: boolean;
      readonly readyPromise: Promise<boolean>
      readonly rectangle: Rectangle;
      readonly tileDiscardPolicy: TileDiscardPolicy;
      readonly tileHeight: number;
      readonly tileWidth: number;
      readonly tilingScheme: TilingScheme;
      times: TimeIntervalCollection;
      readonly url: string;

      constructor(options: {
          url: string;
          format?: string;
          layer: string;
          style: string;
          tileMatrixSetID: string;
          tileMatrixLabels?: any[];
          clock?: Clock;
          times?: TimeIntervalCollection;
          dimensions?: any;
          tileWidth?: number;
          tileHeight?: number;
          tilingScheme?: TilingScheme;
          proxy?: any;
          rectangle?: Rectangle;
          minimumLevel?: number;
          maximumLevel?: number;
          ellipsoid?: Ellipsoid;
          credit?: Credit | string;
          subdomains?: string | string[]
      });

      getTileCredits(x: number, y: number, level: number): Credit[];

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>;

      requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>;
  }

  class Animation {
      container: Element;
      viewModel: AnimationViewModel;

      constructor(container: Element | string, viewModel: AnimationViewModel);

      isDestroyed(): boolean;

      destroy(): void;

      resize(): void;

      applyThemeChanges(): void;
  }

  class AnimationViewModel {
      shuttleRingDragging: boolean;
      snapToTicks: boolean;
      timeLabel: string;
      dateLabel: string;
      multiplierLabel: string;
      shuttleRingAngle: number;
      slower: Command;
      faster: Command;
      clockViewModel: ClockViewModel;
      pauseViewModel: ToggleButtonViewModel;
      playReverseViewModel: ToggleButtonViewModel;
      playForwardViewModel: ToggleButtonViewModel;
      playRealtimeViewModel: ToggleButtonViewModel;
      dateFormatter: AnimationViewModel.DateFormatter;
      timeFormatter: AnimationViewModel.TimeFormatter;
      static defaultDateFormatter: AnimationViewModel.DateFormatter;
      static defaultTicks: number[];
      static defaultTimeFormatter: AnimationViewModel.TimeFormatter;

      constructor(clockViewModel: ClockViewModel);

      getShuttleRingTicks(): number[];

      setShuttleRingTicks(positiveTicks: number[]): void;
  }

  module AnimationViewModel {
      type DateFormatter = (date: JulianDate, viewModel: AnimationViewModel) => string;
      type TimeFormatter = (date: JulianDate, viewModel: AnimationViewModel) => string;
  }

  class BaseLayerPicker {
      container: Element;
      viewModel: BaseLayerPickerViewModel;

      constructor(container: Element, options: { globe: Globe; imageryProviderViewModels?: ProviderViewModel[]; selectedImageryProviderViewModel?: ProviderViewModel; terrainProviderViewModels?: ProviderViewModel[]; selectedTerrainProviderViewModel?: ProviderViewModel });

      isDestroyed(): boolean;

      destroy(): void;
  }

  class BaseLayerPickerViewModel {
      imageryProviderViewModels: ProviderViewModel[];
      terrainProviderViewModels: ProviderViewModel[];
      dropDownVisible: boolean;
      buttonTooltip: string;
      buttonImageUrl: string;
      selectedImagery: ProviderViewModel;
      selectedTerrain: ProviderViewModel;
      toggleDropDown: Command;
      globe: Globe;

      constructor(options: { globe: Globe; imageryProviderViewModels?: ProviderViewModel[]; selectedImageryProviderViewModel?: ProviderViewModel; terrainProviderViewModels?: ProviderViewModel[]; selectedTerrainProviderViewModel?: ProviderViewModel });
  }

  class ProviderViewModel {
      name: string;
      tooltip: string;
      iconUrl: string;
      creationCommand: Command;

      constructor(options: {
          name: string;
          tooltip: string;
          iconUrl: string;
          creationFunction: ProviderViewModel.CreationFunction | Command
      });
  }

  module ProviderViewModel {
      type CreationFunction = () => ImageryProvider | TerrainProvider | ImageryProvider[] | TerrainProvider[];
  }

  class CesiumInspector {
      container: Element;
      viewModel: CesiumInspectorViewModel;

      constructor(container: Element | string, scene: Scene);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class CesiumInspectorViewModel {
      frustums: boolean;
      performance: boolean;
      shaderCacheText: string;
      primitiveBoundingSphere: boolean;
      primitiveReferenceFrame: boolean;
      filterPrimitive: boolean;
      tileBoundingSphere: boolean;
      filterTile: boolean;
      wireframe: boolean;
      suspendUpdates: boolean;
      tileCoordinates: boolean;
      frustumStatisticText: string;
      tileText: string;
      hasPickedPrimitive: boolean;
      hasPickedTile: boolean;
      pickPimitiveActive: boolean;
      pickTileActive: boolean;
      dropDownVisible: boolean;
      generalVisible: boolean;
      primitivesVisible: boolean;
      terrainVisible: boolean;
      generalSwitchText: string;
      primitivesSwitchText: string;
      terrainSwitchText: string;
      scene: Scene;
      performanceContainer: Element;
      toggleDropDown: Command;
      showFrustums: Command;
      showPerformance: Command;
      showPrimitiveBoundingSphere: Command;
      showPrimitiveReferenceFrame: Command;
      doFilterPrimitive: Command;
      showWireframe: Command;
      doSuspendUpdates: Command;
      showTileCoordinates: Command;
      showTileBoundingSphere: Command;
      doFilterTile: Command;
      toggleGeneral: Command;
      togglePrimitives: Command;
      toggleTerrain: Command;
      pickPrimitive: Command;
      pickTile: Command;
      selectParent: Command;
      selectNW: Command;
      selectNE: Command;
      selectSW: Command;
      selectSE: Command;
      primitive: Command;
      tile: Command;

      constructor(scene: Scene);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class CesiumWidget {
      container: Element;
      canvas: HTMLCanvasElement;
      creditContainer: Element;
      scene: Scene;
      imageryLayers: ImageryLayerCollection;
      terrainProvider: TerrainProvider;
      camera: Camera;
      clock: Clock;
      screenSpaceEventHandler: ScreenSpaceEventHandler;
      targetFrameRate: number;
      useDefaultRenderLoop: boolean;
      resolutionScale: number;

      constructor(container: Element | string, options?: CesiumWidgetOptions);

      showErrorPanel(title: string, message: string, error?: string): void;

      isDestroyed(): boolean;

      destroy(): void;

      resize(): void;

      render(): void;
  }

  class CesiumWidgetOptions {
      clock?: Clock;
      imageryProvider?: ImageryProvider;
      terrainProvider?: TerrainProvider;
      skyBox?: SkyBox | boolean;
      skyAtmosphere?: SkyAtmosphere;
      sceneMode?: SceneMode;
      scene3DOnly?: boolean;
      orderIndependentTranslucency?: boolean;
      mapProjection?: MapProjection;
      globe?: Globe;
      useDefaultRenderLoop?: boolean;
      targetFrameRate?: number;
      showRenderLoopErrors?: boolean;
      contextOptions?: any;
      creditContainer?: Element | string;
  }

  class ClockViewModel {
      systemTime: JulianDate;
      startTime: JulianDate;
      stopTime: JulianDate;
      currentTime: JulianDate;
      multiplier: number;
      clockStep: ClockStep;
      clockRange: ClockRange;
      canAnimate: boolean;
      shouldAnimate: boolean;
      clock: Clock;

      constructor(clock?: Clock);

      synchronize(): void;

      isDestroyed(): boolean;

      destroy(): void;
  }

  class Command {
      canExecute: boolean;
      beforeExecute: Event;
      afterExecute: Event;
  }

  class FullscreenButton {
      container: Element;
      viewModel: FullscreenButtonViewModel;

      constructor(container: Element | string, fullscreenElement?: Element | string);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class FullscreenButtonViewModel {
      isFullscreen: boolean;
      isFullscreenEnabled: boolean;
      tooltip: string;
      fullscreenElement: Element;
      command: Command;

      constructor(fullscreenElement?: Element | string);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class GeocoderOptions {
      container?: Element | string
      scene?: Scene
      url?: string
      key?: string
      flightDuration?: number;
  }

  class Geocoder {
      container: Element;
      viewModel: GeocoderViewModel;

      constructor(options: GeocoderOptions);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class GeocoderViewModel {
      isSearchInProgress: boolean;
      searchText: string;
      flightDuration: number;
      url: string;
      key: string;
      complete: Event;
      scene: Scene;
      search: Command;

      constructor(options: { scene: Scene; url?: string; key?: string; flightDuration?: number });
  }

  class GeocoderResult {
      displayName: string;
      destination: Rectangle | Cartesian3;
  }

  interface GeocoderService {
      geocode(query: string): Promise<Array<GeocoderResult>>
  }

  class HomeButton {
      container: Element;
      viewModel: HomeButtonViewModel;

      constructor(container: Element | string, scene: Scene, duration?: number);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class HomeButtonViewModel {
      tooltip: string;
      scene: Scene;
      command: Command;
      duration: number;

      constructor(scene: Scene, duration?: number);
  }

  class InfoBox {
      container: Element;
      viewModel: InfoBoxViewModel;
      frame: HTMLIFrameElement;

      constructor(container: Element | string);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class InfoBoxViewModel {
      maxHeight: number;
      enableCamera: boolean;
      isCameraTracking: boolean;
      showInfo: boolean;
      titleText: string;
      description: string;
      cameraIconPath: string;
      cameraClicked: Event;
      closeClicked: Event;

      maxHeightOffset(offset: number): string;
  }

  class NavigationHelpButton {
      container: Element;
      viewModel: NavigationHelpButtonViewModel;

      constructor(options: { container: Element | string; instructionsInitiallyVisible?: boolean });

      isDestroyed(): boolean;

      destroy(): void;
  }

  class NavigationHelpButtonViewModel {
      showInstructions: boolean;
      tooltip: string;
      command: Command;
      showClick: Command;
      showTouch: Command;
  }

  class PerformanceWatchdog {
      container: Element;
      viewModel: PerformanceWatchdogViewModel;

      constructor(options?: { container: Element | string; scene: Scene; lowFrameRateMessage?: string });

      isDestroyed(): boolean;

      destroy(): void;
  }

  class PerformanceWatchdogViewModel {
      lowFrameRateMessage: string;
      lowFrameRateMessageDismissed: boolean;
      showingLowFrameRateMessage: boolean;
      scene: Scene;
      dismissMessage: Command;

      constructor(options?: { scene: Scene; lowFrameRateMessage?: string });
  }

  class SceneModePicker {
      container: Element;
      viewModel: SceneModePickerViewModel;

      constructor(container: Element | string, scene: Scene, duration?: number);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class SceneModePickerViewModel {
      sceneMode: SceneMode;
      dropDownVisible: boolean;
      tooltip2D: string;
      tooltip3D: string;
      tooltipColumbusView: string;
      selectedTooltip: string;
      scene: Scene;
      duration: number;
      toggleDropDown: Command;
      morphTo2D: Command;
      morphTo3D: Command;
      morphToColumbusView: Command;

      constructor(scene: Scene, duration?: number);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class SelectionIndicator {
      container: Element;
      viewModel: SelectionIndicatorViewModel;

      constructor(container: Element | string, scene: Scene);

      isDestroyed(): boolean;

      destroy(): void;
  }

  class SelectionIndicatorViewModel {
      position: Cartesian3;
      showSelection: boolean;
      isVisible: boolean;
      computeScreenSpacePosition: SelectionIndicatorViewModel.ComputeScreenSpacePosition;
      container: Element;
      selectionIndicatorElement: Element;
      scene: Scene;

      constructor(scene: Scene, selectionIndicatorElement: Element, container: Element);

      update(): void;

      animateAppear(): void;

      animateDepart(): void;
  }

  module SelectionIndicatorViewModel {
      type ComputeScreenSpacePosition = (position: Cartesian3, result: Cartesian2) => Cartesian2;
  }

  class Timeline {
      container: Element;

      constructor(container: Element, clock: Clock);

      isDestroyed(): boolean;

      destroy(): void;

      zoomTo(startTime: JulianDate, stopTime: JulianDate): void;

      resize(): void;
  }

  class ToggleButtonViewModel {
      toggled: boolean;
      tooltip: string;
      command: Command;

      constructor(command: Command, options?: { toggled?: boolean; tooltip?: string });
  }

  class ProjectionPicker {
      container: Element;
      viewModel: ProjectionPickerViewModel;

      constructor(container: Element | String, scene: Scene);

      destroy(): void;

      isDestroyed(): boolean;
  }

  class ProjectionPickerViewModel {
      dropDownVisible: boolean;
      isOrthographicProjection: Command;
      scene: Scene;
      sceneMode: SceneMode;
      selectedTooltip: String;
      switchToOrthographic: Command;
      switchToPerspective: Command;
      toggleDropDown: Command;
      tooltipOrthographic: String;
      tooltipPerspective: String;

      constructor(scene: Scene);

      destroy(): void;

      isDestroyed(): boolean;
  }

  class Viewer {
      allowDataSourcesToSuspendAnimation: boolean;
      readonly animation: Animation;
      readonly baseLayerPicker: BaseLayerPicker;
      readonly bottomContainer: Element;
      readonly camera: Camera;
      readonly canvas: HTMLCanvasElement;
      readonly cesiumLogo: Element;
      readonly cesiumWidget: CesiumWidget;
      readonly clock: Clock;
      clockTrackedDataSource: DataSource;
      readonly clockViewModel: ClockViewModel;
      readonly container: Element;
      readonly dataSourceDisplay: DataSourceDisplay;
      readonly dataSources: DataSourceCollection;
      readonly entities: EntityCollection;
      readonly fullscreenButton: FullscreenButton;
      readonly geocoder: Geocoder;
      readonly homeButton: HomeButton;
      readonly imageryLayers: ImageryLayerCollection;
      readonly infoBox: InfoBox;
      readonly navigationHelpButton: NavigationHelpButton;
      readonly projectionPicker: ProjectionPicker;
      resolutionScale: number;
      readonly scene: Scene;
      readonly sceneModePicker: SceneModePicker;
      readonly screenSpaceEventHandler: ScreenSpaceEventHandler;
      selectedEntity: Entity;
      readonly selectedEntityChanged: Event;
      readonly selectionIndicator: SelectionIndicator;
      readonly shadowMap: ShadowMap;
      shadows: boolean;
      targetFrameRate: number;
      terrainProvider: TerrainProvider;
      terrainShadows: boolean;
      readonly timeline: Timeline;
      trackedEntity: Entity;
      readonly trackedEntityChanged: Event;
      useDefaultRenderLoop: boolean;
      readonly vrButton: VRButton;

      constructor(container: Element | string, options?: ViewerOptions);

      destroy(): void;

      extend(mixin: Viewer.ViewerMixin, options: any): void;

      flyTo(target: Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Promise<Entity | Entity[] | EntityCollection | DataSource | ImageryLayer>,
          options?: { duration?: number; maximumHeight?: number; offset?: HeadingPitchRange }): Promise<boolean>;

      forceResize(): void;

      isDestroyed(): boolean;

      render(): void;

      resize(): void;

      zoomTo(target: Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset | Promise<(Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset)>, offset?: HeadingPitchRange): Promise<boolean>;
  }

  module Viewer {
      type ViewerMixin = (viewer: Viewer, options: any) => void;
  }

  class ViewerOptions {
      animation?: boolean;
      baseLayerPicker?: boolean;
      fullscreenButton?: boolean;
      vrButton?: boolean;
      geocoder?: boolean | GeocoderService[];
      homeButton?: boolean;
      infoBox?: boolean;
      sceneModePicker?: boolean;
      selectionIndicator?: boolean;
      timeline?: boolean;
      navigationHelpButton?: boolean;
      navigationInstructionsInitiallyVisible?: boolean;
      scene3DOnly?: boolean;
      shouldAnimate?: boolean;
      clockViewModel?: ClockViewModel;
      selectedImageryProviderViewModel?: ProviderViewModel;
      imageryProviderViewModels?: ProviderViewModel[];
      selectedTerrainProviderViewModel?: ProviderViewModel;
      terrainProviderViewModels?: ProviderViewModel[];
      imageryProvider?: ImageryProvider | boolean;
      terrainProvider?: TerrainProvider | boolean;
      skyBox?: SkyBox | undefined;
      skyAtmosphere?: SkyAtmosphere | boolean;
      fullscreenElement?: Element | string;
      useDefaultRenderLoop?: boolean;
      targetFrameRate?: number;
      showRenderLoopErrors?: boolean;
      automaticallyTrackDataSourceClocks?: boolean;
      contextOptions?: any;
      sceneMode?: SceneMode;
      mapProjection?: MapProjection;
      globe?: Globe | boolean;
      orderIndependentTranslucency?: boolean;
      creditContainer?: Element | string;
      dataSources?: DataSourceCollection;
      terrainExaggeration?: number;
      shadows?: boolean;
      terrainShadows?: ShadowMode;
      mapMode2D?: MapMode2D;
      projectionPicker?: boolean;
      requestRenderMode?: boolean;
      maximumRenderTimeChange?: number;
  }

  class VRButton {
      constructor(container: Element | string, scene: Scene, vrElement: Element | string);

      readonly container: Element;
      readonly viewModel: VRButtonViewModel;

      destroy(): void;

      isDestroyed(): boolean;
  }

  class VRButtonViewModel {
      constructor(scene: Scene, vrElement: Element | string);

      readonly command: Command;
      isVREnabled: boolean;
      readonly isVRMode: boolean;
      readonly tooltip: string;
      vrElement: Element;

      destroy(): void;

      isDestroyed(): boolean;
  }

  function barycentricCoordinates(point: Cartesian2 | Cartesian3, p0: Cartesian2 | Cartesian3, p1: Cartesian2 | Cartesian3, p2: Cartesian2 | Cartesian3, result?: Cartesian3): Cartesian3;

  function binarySearch(array: any[], itemToFind: any, comparator: binarySearch.Comparator): number;

  module binarySearch {
      type Comparator = (a: any, b: any) => number;
  }

  function cancelAnimationFrame(requestID: number): void;

  function clone(object: Object, deep?: boolean): Object;

  function combine(object1?: Object, object2?: Object, deep?: boolean): Object;

  function destroyObject(object: any, message?: string): void;

  function formatError(object: any): string;

  function getFilenameFromUri(uri: string): string;

  function getImagePixels(image: HTMLImageElement): number[];

  function isArray(value: any): boolean;

  function isLeapYear(year: number): boolean;

  function jsonp(url: string, options?: { parameters?: any; callbackParameterName?: string; proxy?: any }): Promise<any>;

  function loadArrayBuffer(url: string, headers?: any): Promise<ArrayBuffer>;

  function loadBlob(url: string, headers?: any): Promise<Blob>;

  function loadImage(url: string, allowCrossOrigin?: boolean): Promise<HTMLImageElement>;

  function loadImageViaBlob(url: string): Promise<HTMLImageElement>;

  function loadJson(url: string, headers?: any): Promise<any>;

  function loadText(url: string, headers?: any): Promise<string>;

  function loadWithXhr(options: {
      url: string;
      responseType?: string;
      method?: string;
      data?: string | FormData;
      headers?: any;
      overrideMimeType?: string;
  }): Promise<any>;

  function loadXML(url: string, headers?: any): Promise<XMLDocument>;

  function mergeSort(array: any[], comparator: mergeSort.Comparator, userDefinedObject?: any): void;

  module mergeSort {
      type Comparator = (a: any, b: any, userDefinedObject?: any) => number;
  }

  function objectToQuery(obj: any): string;

  function pointInsideTriangle(point: Cartesian2 | Cartesian3, p0: Cartesian2 | Cartesian3, p1: Cartesian2 | Cartesian3, p2: Cartesian2 | Cartesian3): boolean;

  function queryToObject(queryString: string): any;

  function requestAnimationFrame(callback: requestAnimationFrame.Callback): number;

  module requestAnimationFrame {
      type Callback = (timestamp: number) => void;
  }

  function sampleTerrain(terrainProvider: TerrainProvider, level: number, positions: Cartographic[]): Promise<Cartographic[]>;

  function subdivideArray<T>(array: T[], numberOfArrays: number): T[][];

  function throttleRequestByServer(url: string, requestFunction: throttleRequestByServer.RequestFunction): Promise<any>;

  module throttleRequestByServer {
      type RequestFunction = (url: string) => Promise<any>;
  }

  function createTangentSpaceDebugPrimitive(options: { geometry: Geometry; length?: number; modelMatrix?: Matrix4 }): Primitive;

  function viewerCesiumInspectorMixin(viewer: Viewer): void;

  function viewerDragDropMixin(viewer: Viewer, options?: { dropTarget?: Element | string; clearOnDrop?: boolean; proxy?: DefaultProxy }): void;

  function viewerPerformanceWatchdogMixin(viewer: Viewer): void;

  function createCommand(func: Function, canExecute?: boolean): Function;

  function createTaskProcessorWorker(workerFunction: createTaskProcessorWorker.WorkerFunction): createTaskProcessorWorker.TaskProcessorWorkerFunction;

  function createWorldTerrain(options?: { requestVertexNormals?: boolean, requestWaterMask?: boolean }): CesiumTerrainProvider;

  module createTaskProcessorWorker {
      type WorkerFunction = (parameters: any, transferableObjects: any[]) => any;
      type TaskProcessorWorkerFunction = (event: any) => void;
  }

  class ClockRange {
      static UNBOUNDED: number;
      static CLAMPED: number;
      static LOOP_STOP: number;
  }

  class ClockStep {
      static TICK_DEPENDENT: number;
      static SYSTEM_CLOCK_MULTIPLIER: number;
      static SYSTEM_CLOCK: number;
  }

  class ComponentDatatype {
      static BYTE: number;
      static UNSIGNED_BYTE: number;
      static SHORT: number;
      static UNSIGNED_SHORT: number;
      static FLOAT: number;
      static DOUBLE: number;
      static INT: number;
      static UNSIGNED_INT: number;
  }

  module ComponentDatatype {
      function getSizeInBytes(componentDatatype: ComponentDatatype): number;

      function fromTypedArray(array: Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Float64Array): ComponentDatatype;

      function validate(componentDatatype: ComponentDatatype): boolean;

      function createTypedArray(componentDatatype: ComponentDatatype, valuesOrLength: number | any[]): Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Float64Array;

      function createArrayBufferView(componentDatatype: ComponentDatatype, buffer: ArrayBuffer, byteOffset?: number, length?: number): Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Float64Array;
  }

  class CornerType {
      static ROUNDED: number;
      static MITERED: number;
      static BEVELED: number;
  }

  module CubicRealPolynomial {
      function computeDiscriminant(a: number, b: number, c: number, d: number): number;

      function computeRealRoots(a: number, b: number, c: number, d: number): number[];
  }

  class ExtrapolationType {
      static NONE: number;
      static HOLD: number;
      static EXTRAPOLATE: number;
  }

  module FeatureDetection {
      function supportsFullscreen(): boolean;

      function supportsTypedArrays(): boolean;

      function supportsWebWorkers(): boolean;
  }

  class Fullscreen {
      static element: any;
      static changeEventName: string;
      static errorEventName: string;
      static enabled: boolean;
      static fullscreen: boolean;
  }

  module Fullscreen {

      function supportsFullscreen(): boolean;

      function requestFullscreen(element: any): boolean;

      function exitFullscreen(): boolean;
  }

  module GeometryPipeline {
      function toWireframe(geometry: Geometry): Geometry;

      function createLineSegmentsForVectors(geometry: Geometry, attributeName?: string, length?: number): Geometry;

      function createAttributeLocations(geometry: Geometry): any;

      function reorderForPreVertexCache(geometry: Geometry): Geometry;

      function reorderForPostVertexCache(geometry: Geometry, cacheCapacity?: number): Geometry;

      function fitToUnsignedShortIndices(geometry: Geometry): Geometry[];

      function projectTo2D(geometry: Geometry, attributeName: string, attributeName3D: string, attributeName2D: string, projection?: any): Geometry;

      function encodeAttribute(geometry: Geometry, attributeName: string, attributeHighName: string, attributeLowName: string): Geometry;

      function transformToWorldCoordinates(instance: GeometryInstance): GeometryInstance;

      function computeNormal(geometry: Geometry): Geometry;

      function computeBinormalAndTangent(geometry: Geometry): Geometry;

      function compressVertices(geometry: Geometry): Geometry;
  }

  class HeightReference {
      static CLAMP_TO_GROUND: number;
      static NONE: number;
      static RELATIVE_TO_GROUND: number;
  }

  module HermitePolynomialApproximation {
      function getRequiredDataPoints(degree: number, inputOrder?: number): number;

      function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[];

      function interpolate(x: number, xTable: number[], yTable: number[], yStride: number, inputOrder: number, outputOrder: number, result?: number[]): number[];
  }

  class IndexDatatype {
      static UNSIGNED_BYTE: number;
      static UNSIGNED_SHORT: number;
      static UNSIGNED_INT: number;
  }

  module IndexDatatype {
      function getSizeInBytes(indexDatatype: IndexDatatype): number;

      function validate(indexDatatype: IndexDatatype): boolean;

      function createTypedArray(numberOfVertices: number, indicesLengthOrArray: any): Uint16Array | Uint32Array;

      function createTypedArrayFromArrayBuffer(numberOfVertices: number, sourceArray: ArrayBuffer, byteOffset: number, length: number): Uint16Array | Uint32Array;
  }

  class InterpolationAlgorithm {
      static type: string;
  }

  module InterpolationAlgorithm {
      function getRequiredDataPoints(degree: number): number;

      function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[];

      function interpolate(x: number, xTable: number[], yTable: number[], yStride: number, inputOrder: number, outputOrder: number, result?: number[]): number[];
  }

  class Intersect {
      static OUTSIDE: number;
      static INTERSECTING: number;
      static INSIDE: number;
  }

  module IntersectionTests {
      function rayPlane(ray: Ray, plane: Plane, result?: Cartesian3): Cartesian3;

      function rayTriangle(ray: Ray, p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, cullBackFaces?: boolean, result?: Cartesian3): Cartesian3;

      function lineSegmentTriangle(v0: Cartesian3, v1: Cartesian3, p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, cullBackFaces?: boolean, result?: Cartesian3): Cartesian3;

      function raySphere(ray: Ray, sphere: BoundingSphere, result?: any): any;

      function lineSegmentSphere(p0: Cartesian3, p1: Cartesian3, sphere: BoundingSphere, result?: any): any;

      function rayEllipsoid(ray: Ray, ellipsoid: Ellipsoid): any;

      function grazingAltitudeLocation(ray: Ray, ellipsoid: Ellipsoid): Cartesian3;

      function lineSegmentPlane(endPoint0: Cartesian3, endPoint1: Cartesian3, plane: Plane, result?: Cartesian3): Cartesian3;

      function trianglePlaneIntersection(p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, plane: Plane): any;
  }

  module Intersections2D {
      function clipTriangleAtAxisAlignedThreshold(threshold: number, keepAbove: boolean, u0: number, u1: number, u2: number, result?: number[]): number[];

      function computeBarycentricCoordinates(x: number, y: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, result?: Cartesian3): Cartesian3;
  }

  class Iso8601 {
      static MINIMUM_VALUE: JulianDate;
      static MAXIMUM_VALUE: JulianDate;
      static MAXIMUM_INTERVAL: JulianDate;
  }

  class KeyboardEventModifier {
      static SHIFT: number;
      static CTRL: number;
      static ALT: number;
  }

  module LagrangePolynomialApproximation {
      function getRequiredDataPoints(degree: number): number;

      function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[];
  }

  module LinearApproximation {
      function getRequiredDataPoints(degree: number): number;

      function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[];
  }

  class Math {
      static EPSILON1: number;
      static EPSILON2: number;
      static EPSILON3: number;
      static EPSILON4: number;
      static EPSILON5: number;
      static EPSILON6: number;
      static EPSILON7: number;
      static EPSILON8: number;
      static EPSILON9: number;
      static EPSILON10: number;
      static EPSILON11: number;
      static EPSILON12: number;
      static EPSILON13: number;
      static EPSILON14: number;
      static EPSILON15: number;
      static EPSILON16: number;
      static EPSILON17: number;
      static EPSILON18: number;
      static EPSILON19: number;
      static EPSILON20: number;
      static GRAVITATIONALPARAMETER: number;
      static SOLAR_RADIUS: number;
      static LUNAR_RADIUS: number;
      static SIXTY_FOUR_KILOBYTES: number;
      static PI: number;
      static ONE_OVER_PI: number;
      static PI_OVER_TWO: number;
      static PI_OVER_THREE: number;
      static PI_OVER_FOUR: number;
      static PI_OVER_SIX: number;
      static THREE_PI_OVER_TWO: number;
      static TWO_PI: number;
      static ONE_OVER_TWO_PI: number;
      static RADIANS_PER_DEGREE: number;
      static DEGREES_PER_RADIAN: number;
      static RADIANS_PER_ARCSECOND: number;
  }

  module Math {
      function sign(value: number): number;

      function signNotZero(value: number): number;

      function toSNorm(value: number, rangeMax?: number): number;

      function fromSNorm(value: number): number;

      function sinh(value: number): number;

      function cosh(value: number): number;

      function lerp(p: number, q: number, time: number): number;

      function toRadians(degrees: number): number;

      function toDegrees(radians: number): number;

      function convertLongitudeRange(angle: number): number;

      function negativePiToPi(angle: number): number;

      function zeroToTwoPi(angle: number): number;

      function mod(m: number, n: number): number;

      function equalsEpsilon(left: number, right: number, relativeEpsilon: number, absoluteEpsilon?: number): boolean;

      function factorial(n: number): number;

      function incrementWrap(n: number, maximumValue: number, minimumValue?: number): number;

      function isPowerOfTwo(n: number): boolean;

      function logBase(number: number, base: number): number;

      function nextPowerOfTwo(n: number): number;

      function nextRandomNumber(): number;

      function randomBetween(min: number, max: number): number;

      function setRandomNumberSeed(seed: number): void;

      function clamp(value: number, min: number, max: number): number;

      function clampToLatitudeRange(angle: number): number;

      function setRandomNumberSeed(seed: number): void;

      function acosClamped(value: number): number;

      function asinClamped(value: number): number;

      function chordLength(angle: number, radius: number): number;
  }

  class Packable {
      static packedLength: number;
  }

  module Packable {
      function pack(value: any, array: number[], startingIndex?: number): number[];

      function unpack(array: number[], startingIndex?: number, result?: any): any;
  }

  class PackableForInterpolation {
      static packedInterpolationLength: number;
  }

  module PackableForInterpolation {
      function convertPackedArrayForInterpolation(packedArray: number[], startingIndex?: number, lastIndex?: number, result?: number[]): void;

      function unpackInterpolationResult(array: number[], sourceArray: number[], startingIndex?: number, lastIndex?: number, result?: any): any;
  }

  class PixelFormat {
      static DEPTH_COMPONENT: number;
      static DEPTH_STENCIL: number;
      static ALPHA: number;
      static RGB: number;
      static RGBA: number;
      static RGB_DXT1: number;
      static RGB_ETC1: number;
      static RGB_PVRTC_2BPPV1: number;
      static RGB_PVRTC_4BPPV1: number;
      static RGBA_DXT1: number;
      static RGBA_DXT3: number;
      static RGBA_DXT5: number;
      static RGBA_PVRTC_2BPPV1: number;
      static RGBA_PVRTC_4BPPV1: number;
      static LUMINANCE: number;
      static LUMINANCE_ALPHA: number;
  }

  class PrimitiveType {
      static LINE_LOOP: number;
      static LINE_STRIP: number;
      static LINES: number;
      static POINTS: number;
      static TRIANGLE_FAN: number;
      static TRIANGLE_STRIP: number;
      static TRIANGLES: number;
  }

  module QuadraticRealPolynomial {
      function computeDiscriminant(a: number, b: number, c: number): number;

      function computeRealRoots(a: number, b: number, c: number): number[];
  }

  module QuarticRealPolynomial {
      function computeDiscriminant(a: number, b: number, c: number, d: number, e: number): number;

      function computeRealRoots(a: number, b: number, c: number, d: number, e: number): number[];
  }

  class ReferenceFrame {
      static FIXED: number;
      static INERTIAL: number;
  }

  class ScreenSpaceEventType {
      static LEFT_DOWN: number;
      static LEFT_UP: number;
      static LEFT_CLICK: number;
      static LEFT_DOUBLE_CLICK: number;
      static RIGHT_DOWN: number;
      static RIGHT_UP: number;
      static RIGHT_CLICK: number;
      static MIDDLE_DOWN: number;
      static MIDDLE_UP: number;
      static MIDDLE_CLICK: number;
      static MOUSE_MOVE: number;
      static WHEEL: number;
      static PINCH_START: number;
      static PINCH_END: number;
      static PINCH_MOVE: number;
  }

  interface PositionedEvent {
      position: Cartesian2;
  }

  interface MoveEvent {
      startPosition: Cartesian2;
      endPosition: Cartesian2;
  }

  interface Touch2Event {
      position1: Cartesian2;
      position2: Cartesian2;
  }


  module Simon1994PlanetaryPositions {
      function computeSunPositionInEarthInertialFrame(julianDate?: JulianDate, result?: Cartesian3): Cartesian3;

      function computeMoonPositionInEarthInertialFrame(julianDate?: JulianDate, result?: Cartesian3): Cartesian3;
  }

  class TimeStandard {
      static UTC: number;
      static TAI: number;
  }

  module Transforms {
      function eastNorthUpToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4;

      function northEastDownToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4;

      function northUpEastToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4;

      function headingPitchRollToFixedFrame(origin: Cartesian3, heading: number, pitch: number, roll: number, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4;

      function headingPitchRollQuaternion(origin: Cartesian3, heading: number, pitch: number, roll: number, ellipsoid?: Ellipsoid, result?: Quaternion): Quaternion;

      function computeTemeToPseudoFixedMatrix(date: JulianDate, result?: Matrix3): Matrix3;

      function preloadIcrfFixed(timeInterval: TimeInterval): Promise<void>;

      function computeIcrfToFixedMatrix(date: JulianDate, result?: Matrix3): Matrix3;

      function computeFixedToIcrfMatrix(date: JulianDate, result?: Matrix3): Matrix3;

      function pointToWindowCoordinates(modelViewProjectionMatrix: Matrix4, viewportTransformation: Matrix4, point: Cartesian3, result?: Cartesian2): Cartesian2;
  }

  module TridiagonalSystemSolver {
      function solve(diagonal: number[], lower: number[], upper: number[], right: Cartesian3[]): Cartesian3[];
  }

  class Visibility {
      static NONE: number;
      static PARTIAL: number;
      static FULL: number;
  }

  class WindingOrder {
      static CLOCKWISE: number;
      static COUNTER_CLOCKWISE: number;
  }

  class StripeOrientation {
      static HORIZONTAL: number;
      static VERTICAL: number;
  }

  class BingMapsStyle {
      static AERIAL: string;
      static AERIAL_WITH_LABELS: string;
      static ROAD: string;
      static ORDNANCE_SURVEY: string;
      static COLLINS_BART: string;
  }

  class BlendEquation {
      static ADD: number;
      static MAX: number;
      static MIN: number;
      static SUBTRACT: number;
      static REVERSE_SUBTRACT: number;
  }

  class BlendFunction {
      static ZERO: number;
      static ONE: number;
      static SOURCE_COLOR: number;
      static ONE_MINUS_SOURCE_COLOR: number;
      static DESTINATION_COLOR: number;
      static ONE_MINUS_DESTINATION_COLOR: number;
      static SOURCE_ALPHA: number;
      static ONE_MINUS_SOURCE_ALPHA: number;
      static DESTINATION_ALPHA: number;
      static ONE_MINUS_DESTINATION_ALPHA: number;
      static CONSTANT_COLOR: number;
      static ONE_MINUS_CONSTANT_COLOR: number;
      static CONSTANT_ALPHA: number;
      static ONE_MINUS_CONSTANT_ALPHA: number;
      static SOURCE_ALPHA_SATURATE: number;
  }

  class BlendingState {
      static DISABLED: any;
      static ALPHA_BLEND: any;
      static PRE_MULTIPLIED_ALPHA_BLEND: any;
      static ADDITIVE_BLEND: any;
  }

  class CameraEventType {
      static LEFT_DRAG: number;
      static RIGHT_DRAG: number;
      static MIDDLE_DRAG: number;
      static WHEEL: number;
      static PINCH: number;
  }

  class CullFace {
      static FRONT: number;
      static BACK: number;
      static FRONT_AND_BACK: number;
  }

  class DepthFunction {
      static NEVER: number;
      static LESS: number;
      static EQUAL: number;
      static LESS_OR_EQUAL: number;
      static GREATER: number;
      static NOT_EQUAL: number;
      static GREATER_OR_EQUAL: number;
      static ALWAYS: number;
  }

  class HorizontalOrigin {
      static CENTER: number;
      static LEFT: number;
      static RIGHT: number;
  }

  class LabelStyle {
      static FILL: number;
      static OUTLINE: number;
      static FILL_AND_OUTLINE: number;
  }

  class ModelAnimationLoop {
      static NONE: number;
      static REPEAT: number;
      static MIRRORED_REPEAT: number;
  }

  class SceneMode {
      static MORPHING: number;
      static COLUMBUS_VIEW: number;
      static SCENE2D: number;
      static SCENE3D: number;
  }

  module SceneMode {
      function getMorphTime(value: SceneMode): number;
  }

  module SceneTransforms {
      function wgs84ToWindowCoordinates(scene: Scene, position: Cartesian3, result?: Cartesian2): Cartesian2;

      function wgs84ToDrawingBufferCoordinates(scene: Scene, position: Cartesian3, result?: Cartesian2): Cartesian2;
  }

  class StencilFunction {
      static NEVER: number;
      static LESS: number;
      static EQUAL: number;
      static LESS_OR_EQUAL: number;
      static GREATER: number;
      static NOT_EQUAL: number;
      static GREATER_OR_EQUAL: number;
      static ALWAYS: number;
  }

  class StencilOperation {
      static ZERO: number;
      static KEEP: number;
      static REPLACE: number;
      static INCREMENT: number;
      static DECREMENT: number;
      static INVERT: number;
      static INCREMENT_WRAP: number;
      static DECREMENT_WRAP: number;
  }

  class VerticalOrigin {
      static CENTER: number;
      static BOTTOM: number;
      static TOP: number;
  }

  function createTileMapServiceImageryProvider(options: {
      url?: string,
      fileExtension?: string,
      proxy?: {},
      credit?: Credit | string,
      minimumLevel?: number,
      maximumLevel?: number,
      rectangle?: Rectangle,
      tilingScheme?: TilingScheme,
      ellipsoid?: Ellipsoid,
      tileWidth?: number,
      tileHeight?: number,
      flipXY?: boolean
  }): TileMapServiceImageryProvider;

  class UrlTemplateImageryProvider extends ImageryProvider {
      readonly url: string;
      readonly pickFeaturesUrl: string;
      readonly urlSchemeZeroPadding: {};
      readonly proxy: Proxy;
      readonly credit: Credit;
      readonly minimumLevel: number;
      readonly maximumLevel: number;
      readonly rectangle: Rectangle;
      readonly tilingScheme: TilingScheme;
      readonly tileWidth: number;
      readonly tileHeight: number;
      readonly hasAlphaChannel: boolean;
      enablePickFeatures: boolean;
      readonly errorEvent: Event;
      readonly ready: boolean;
      readonly readyPromise: Promise<boolean>;
      readonly tileDiscardPolicy: TileDiscardPolicy;

      constructor(options: {
          url: string,
          pickFeaturesUrl?: string,
          urlSchemeZeroPadding?: {},
          subdomains?: string | Array<string>
          proxy?: {},
          credit?: Credit,
          minimumLevel?: number,
          maximumLevel?: number,
          rectangle?: Rectangle,
          tilingScheme?: TilingScheme,
          ellipsoid?: Ellipsoid,
          tileWidth?: number,
          tileHeight?: number,
          hasAlphaChannel?: boolean,
          getFeatureInfoFormats?: Array<GetFeatureInfoFormat>,
          enablePickFeatures?: boolean,
          customTags?: any
      });

      getTileCredits(x: number, y: number, level: number): Array<Credit>;

      pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<Array<ImageryLayerFeatureInfo>>;

      reinitialize(options: Promise<Object> | Object): void;
  }

  function defined(value: Object): boolean;
}

declare module 'cesium/Cesium' {
  export = Cesium;
}