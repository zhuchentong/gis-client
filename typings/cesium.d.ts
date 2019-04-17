/* tslint:disable */

/**
 * Created by laixiangran on 2018/10/08.
 * homepage：http://www.laixiangran.cn
 * Typescript definition for cesium 1.5x
 */
declare namespace Cesium {

  class Ion {
      public static defaultAccessToken: string
      public static defaultServer: string

      constructor();
  }

  type RenderState = any

  interface Proxy {
      getURL(resource: string): string
  }

  class ArcGisImageServerTerrainProvider {
      public errorEvent: Event
      public credit: Credit
      public tilingScheme: GeographicTilingScheme
      public ready: boolean
      public hasWaterMask: boolean
      public hasVertexNormals: boolean

      constructor(options: { url: string; token?: string; proxy?: any; tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; credit?: Credit | string });

      public requestTileGeometry(x: number, y: number, level: number): Promise<TerrainData>

      public getLevelMaximumGeometricError(level: number): number

      public getTileDataAvailable(x: number, y: number, level: number): boolean
  }

  class AssociativeArray {
      public length: number
      public values: any[]

      public contains(key: string | number): boolean

      public set(key: string | number, value: any): void

      public get(key: string | number): any

      public remove(key: string | number): boolean

      public removeAll(): void
  }

  class AxisAlignedBoundingBox {

      public static fromPoints(positions: Cartesian3[], result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox

      public static clone(box: AxisAlignedBoundingBox, result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox

      public static equals(left?: AxisAlignedBoundingBox, right?: AxisAlignedBoundingBox): boolean

      public static intersect(box: AxisAlignedBoundingBox, plane: Cartesian4): Intersect
      public minimum: Cartesian3
      public maximum: Cartesian3
      public center: Cartesian3

      constructor(minimum?: Cartesian3, maximum?: Cartesian3, center?: Cartesian3);

      public clone(result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox

      public intersect(plane: Cartesian4): Intersect

      public equals(right?: AxisAlignedBoundingBox): boolean
  }

  class BoundingRectangle {

      public static fromPoints(positions: Cartesian2[], result?: BoundingRectangle): BoundingRectangle

      public static fromRectangle(rectangle: Rectangle, projection?: any, result?: BoundingRectangle): BoundingRectangle

      public static clone(rectangle: BoundingRectangle, result?: BoundingRectangle): BoundingRectangle

      public static union(left: BoundingRectangle, right: BoundingRectangle, result?: BoundingRectangle): BoundingRectangle

      public static expand(rectangle: BoundingRectangle, point: Cartesian2, result?: BoundingRectangle): BoundingRectangle

      public static intersect(left: BoundingRectangle, right: BoundingRectangle): Intersect

      public static equals(left?: BoundingRectangle, right?: BoundingRectangle): boolean
      public x: number
      public y: number
      public width: number
      public height: number

      constructor(x?: number, y?: number, width?: number, height?: number);

      public clone(result?: BoundingRectangle): BoundingRectangle

      public intersect(right: BoundingRectangle): Intersect

      public equals(right?: BoundingRectangle): boolean
  }

  class BoundingSphere {
      public static packedLength: number

      public static fromPoints(positions: Cartesian3[], result?: BoundingSphere): BoundingSphere

      public static fromRectangle2D(rectangle: Rectangle, projection?: any, result?: BoundingSphere): BoundingSphere

      public static fromRectangleWithHeights2D(rectangle: Rectangle, projection?: any, minimumHeight?: number, maximumHeight?: number, result?: BoundingSphere): BoundingSphere

      public static fromRectangle3D(rectangle: Rectangle, ellipsoid?: Ellipsoid, surfaceHeight?: number, result?: BoundingSphere): BoundingSphere

      public static fromVertices(positions: Cartesian3[], center?: Cartesian3, stride?: number, result?: BoundingSphere): BoundingSphere

      public static fromCornerPoints(corner?: number, oppositeCorner?: number, result?: BoundingSphere): BoundingSphere

      public static fromEllipsoid(ellipsoid: Ellipsoid, result?: BoundingSphere): BoundingSphere

      public static fromBoundingSpheres(boundingSpheres: BoundingSphere[], result?: BoundingSphere): BoundingSphere

      public static fromEncodedCartesianVertices(positionsHigh?: number[], positionsLow?: number[], result?: BoundingSphere): BoundingSphere

      public static fromOrientedBoundingBox(orientedBoundingBox: OrientedBoundingBox, result?: BoundingSphere): BoundingSphere

      public static clone(sphere: BoundingSphere, result?: BoundingSphere): BoundingSphere

      public static pack(value: BoundingSphere, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: BoundingSphere): BoundingSphere

      public static union(left: BoundingSphere, right: BoundingSphere, result?: BoundingSphere): BoundingSphere

      public static expand(sphere: BoundingSphere, point: Cartesian3, result?: BoundingSphere): BoundingSphere

      public static intersect(sphere: BoundingSphere, plane: Cartesian4): Intersect

      public static transform(sphere: BoundingSphere, transform: Matrix4, result?: BoundingSphere): BoundingSphere

      public static distanceSquaredTo(sphere: BoundingSphere, cartesian: Cartesian3): number

      public static transformWithoutScale(sphere: BoundingSphere, transform: Matrix4, result?: BoundingSphere): BoundingSphere

      public static computePlaneDistances(sphere: BoundingSphere, position: Cartesian3, direction: Cartesian3, result?: Cartesian2): Interval

      public static projectTo2D(sphere: BoundingSphere, projection?: any, result?: BoundingSphere): BoundingSphere

      public static equals(left?: BoundingSphere, right?: BoundingSphere): boolean

      public static intersectPlane(sphere: BoundingSphere, plane: Plane): Intersect

      public static isOccluded(sphere: BoundingSphere, occluder: Occluder): boolean
      public center: Cartesian3
      public radius: number

      constructor(center?: Cartesian3, radius?: number);

      public intersect(plane: Cartesian4): Intersect

      public equals(right?: BoundingSphere): boolean

      public clone(result?: BoundingSphere): BoundingSphere

      public computePlaneDistances(position: Cartesian3, direction: Cartesian3, result?: Interval): Interval

      public distanceSquaredTo(cartesian: Cartesian3): number

      public intersectPlane(plane: Plane): Intersect

      public isOccluded(occluder: Occluder): boolean
  }

  class OrientedBoundingBox {

      public static clone(box: OrientedBoundingBox, result?: OrientedBoundingBox): OrientedBoundingBox

      public static computePlaneDistances(box: OrientedBoundingBox, position: Cartesian3, direction: Cartesian3, result?: Interval): Interval

      public static distanceSquaredTo(box: OrientedBoundingBox, cartesian: Cartesian3): number

      public static equals(left: OrientedBoundingBox, right: OrientedBoundingBox): boolean

      public static fromPoints(positions: Cartesian3[], result?: OrientedBoundingBox): OrientedBoundingBox

      public static fromRectangle(rectangle: Rectangle, minimumHeight?: number, maximumHeight?: number, ellipsoid?: Ellipsoid, result?: OrientedBoundingBox): OrientedBoundingBox

      public static intersectPlane(box: OrientedBoundingBox, plane: Plane): Intersect

      public static isOccluded(box: OrientedBoundingBox, occluder: Occluder): boolean
      public center: Cartesian3
      public halfAxes: Matrix3

      constructor(center?: Cartesian3, halfAxes?: Matrix3);

      public clone(result?: OrientedBoundingBox): OrientedBoundingBox

      public computePlaneDistances(position: Cartesian3, direction: Cartesian3, result?: Interval): Interval

      public distanceSquaredTo(cartesian: Cartesian3): number

      public equals(right: OrientedBoundingBox): boolean

      public intersectPlane(plane: Plane): Intersect

      public isOccluded(occluder: Occluder): boolean
  }

  class BoxGeometry {
      public static packedLength: number

      public static createGeometry(boxGeometry: BoxGeometry): Geometry | undefined

      public static fromAxisAlignedBoundingBox(boundingBox: AxisAlignedBoundingBox): BoxGeometry

      public static fromDimensions(options: { dimensions: Cartesian3, vertexFormat?: VertexFormat }): BoxGeometry

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: BoxGeometry): BoxGeometry

      constructor(options: {
          minimumCorner: Cartesian3;
          maximumCorner: Cartesian3;
          vertexFormat?: VertexFormat
      });
  }

  class BoxOutlineGeometry {
      public static packedLength: number

      public static fromDimensions(): BoxOutlineGeometry

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: BoxOutlineGeometry): BoxOutlineGeometry

      public static createGeometry(boxGeometry: BoxOutlineGeometry): Geometry | undefined

      constructor();
  }

  class Cartesian2 {
      public static packedLength: number
      public static ZERO: Cartesian2
      public static UNIT_X: Cartesian2
      public static UNIT_Y: Cartesian2

      public static fromElements(x: number, y: number, result?: Cartesian2): Cartesian2

      public static clone(cartesian: Cartesian2, result?: Cartesian2): Cartesian2

      public static fromCartesian3(cartesian: Cartesian3, result?: Cartesian2): Cartesian2

      public static fromCartesian4(cartesian: Cartesian4, result?: Cartesian2): Cartesian2

      public static pack(value: Cartesian2, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Cartesian2): Cartesian2

      public static fromArray(array: number[], startingIndex?: number, result?: Cartesian2): Cartesian2

      public static maximumComponent(cartesian: Cartesian2): number

      public static minimumComponent(cartesian: Cartesian2): number

      public static minimumByComponent(first: Cartesian2, second: Cartesian2, result: Cartesian2): Cartesian2

      public static maximumByComponent(first: Cartesian2, second: Cartesian2, result: Cartesian2): Cartesian2

      public static magnitudeSquared(cartesian: Cartesian2): number

      public static magnitude(cartesian: Cartesian2): number

      public static distance(left: Cartesian2, right: Cartesian2): number

      public static distanceSquared(left: Cartesian2, right: Cartesian2): number

      public static normalize(cartesian: Cartesian2, result: Cartesian2): Cartesian2

      public static dot(left: Cartesian2, right: Cartesian2): number

      public static multiplyComponents(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2

      public static add(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2

      public static subtract(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2

      public static multiplyByScalar(cartesian: Cartesian2, scalar: number, result: Cartesian2): Cartesian2

      public static divideByScalar(cartesian: Cartesian2, scalar: number, result: Cartesian2): Cartesian2

      public static negate(cartesian: Cartesian2, result: Cartesian2): Cartesian2

      public static abs(cartesian: Cartesian2, result: Cartesian2): Cartesian2

      public static lerp(start: Cartesian2, end: Cartesian2, t: number, result: Cartesian2): Cartesian2

      public static angleBetween(left: Cartesian2, right: Cartesian2): number

      public static mostOrthogonalAxis(cartesian: Cartesian2, result: Cartesian2): Cartesian2

      public static equals(left?: Cartesian2, right?: Cartesian2): boolean

      public static equalsEpsilon(left: Cartesian2, right: Cartesian2, relativeEpsilon: number, absoluteEpsilon?: number): boolean
      public x: number
      public y: number

      constructor(x?: number, y?: number);

      public clone(result?: Cartesian2): Cartesian2

      public equals(right?: Cartesian2): boolean

      public equalsEpsilon(right: Cartesian2, relativeEpsilon: number, absoluteEpsilon?: number): boolean

      public toString(): string
  }

  class Cartesian3 implements PositionProperty {
      public static packedLength: number
      public static ZERO: Cartesian3
      public static UNIT_X: Cartesian3
      public static UNIT_Y: Cartesian3
      public static UNIT_Z: Cartesian3

      public static fromSpherical(spherical: Spherical, result?: Cartesian3): Cartesian3

      public static fromElements(x: number, y: number, z: number, result?: Cartesian3): Cartesian3

      public static clone(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public static fromCartesian4(cartesian: Cartesian4, result?: Cartesian3): Cartesian3

      public static pack(value: Cartesian3, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Cartesian3): Cartesian3

      public static fromArray(array: number[], startingIndex?: number, result?: Cartesian3): Cartesian3

      public static maximumComponent(cartesian: Cartesian3): number

      public static minimumComponent(cartesian: Cartesian3): number

      public static minimumByComponent(first: Cartesian3, second: Cartesian3, result: Cartesian3): Cartesian3

      public static maximumByComponent(first: Cartesian3, second: Cartesian3, result: Cartesian3): Cartesian3

      public static magnitudeSquared(cartesian: Cartesian3): number

      public static magnitude(cartesian: Cartesian3): number

      public static distance(left: Cartesian3, right: Cartesian3): number

      public static distanceSquared(left: Cartesian3, right: Cartesian3): number

      public static normalize(cartesian: Cartesian3, result: Cartesian3): Cartesian3

      public static dot(left: Cartesian3, right: Cartesian3): number

      public static multiplyComponents(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3

      public static add(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3

      public static subtract(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3

      public static multiplyByScalar(cartesian: Cartesian3, scalar: number, result: Cartesian3): Cartesian3

      public static divideByScalar(cartesian: Cartesian3, scalar: number, result: Cartesian3): Cartesian3

      public static negate(cartesian: Cartesian3, result: Cartesian3): Cartesian3

      public static abs(cartesian: Cartesian3, result: Cartesian3): Cartesian3

      public static lerp(start: Cartesian3, end: Cartesian3, t: number, result: Cartesian3): Cartesian3

      public static angleBetween(left: Cartesian3, right: Cartesian3): number

      public static mostOrthogonalAxis(cartesian: Cartesian3, result: Cartesian3): Cartesian3

      public static equals(left?: Cartesian3, right?: Cartesian3): boolean

      public static equalsEpsilon(left: Cartesian3, right: Cartesian3, relativeEpsilon: number, absoluteEpsilon?: number): boolean

      public static cross(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3

      public static fromDegrees(longitude: number, latitude: number, height?: number, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3

      public static fromRadians(longitude: number, latitude: number, height?: number, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3

      public static fromDegreesArray(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[]

      public static fromRadiansArray(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[]

      public static fromDegreesArrayHeights(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[]

      public static fromRadiansArrayHeights(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[]

      /**
       * 计算两个笛卡尔坐标系的中点
       * @param left 
       * @param right 
       * @param result 
       */
      public static midpoint(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3
      public x: number
      public y: number
      public z: number

      public isConstant: boolean
      public definitionChanged: Event
      public referenceFrame: ReferenceFrame

      constructor(x?: number, y?: number, z?: number);

      public clone(result?: Cartesian3): Cartesian3

      public equals(right?: Cartesian3): boolean

      public equalsEpsilon(right: Cartesian3, relativeEpsilon: number, absoluteEpsilon?: number): boolean

      public toString(): string

      public getValue(time: JulianDate, result?: Cartesian3): Cartesian3

      public getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3

      public setInterpolationOptions(options?: { interpolationAlgorithm?: InterpolationAlgorithm; interpolationDegree?: number }): void
  }

  class Cartesian4 {
      public static packedLength: number
      public static ZERO: Cartesian4
      public static UNIT_X: Cartesian4
      public static UNIT_Y: Cartesian4
      public static UNIT_Z: Cartesian4
      public static UNIT_W: Cartesian4

      public static fromElements(x: number, y: number, z: number, w: number, result?: Cartesian4): Cartesian4

      public static fromColor(color: Color, result?: Cartesian4): Cartesian4

      public static clone(cartesian: Cartesian4, result?: Cartesian4): Cartesian4

      public static pack(value: Cartesian4, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Cartesian4): Cartesian4

      public static fromArray(array: number[], startingIndex?: number, result?: Cartesian4): Cartesian4

      public static maximumComponent(cartesian: Cartesian4): number

      public static minimumComponent(cartesian: Cartesian4): number

      public static minimumByComponent(first: Cartesian4, second: Cartesian4, result: Cartesian4): Cartesian4

      public static maximumByComponent(first: Cartesian4, second: Cartesian4, result: Cartesian4): Cartesian4

      public static magnitudeSquared(cartesian: Cartesian4): number

      public static magnitude(cartesian: Cartesian4): number

      public static distance(left: Cartesian4, right: Cartesian4): number

      public static distanceSquared(left: Cartesian4, right: Cartesian4): number

      public static normalize(cartesian: Cartesian4, result: Cartesian4): Cartesian4

      public static dot(left: Cartesian4, right: Cartesian4): number

      public static multiplyComponents(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4

      public static add(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4

      public static subtract(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4

      public static multiplyByScalar(cartesian: Cartesian4, scalar: number, result: Cartesian4): Cartesian4

      public static divideByScalar(cartesian: Cartesian4, scalar: number, result: Cartesian4): Cartesian4

      public static negate(cartesian: Cartesian4, result: Cartesian4): Cartesian4

      public static abs(cartesian: Cartesian4, result: Cartesian4): Cartesian4

      public static lerp(start: Cartesian4, end: Cartesian4, t: number, result: Cartesian4): Cartesian4

      public static mostOrthogonalAxis(cartesian: Cartesian4, result: Cartesian4): Cartesian4

      public static equals(left?: Cartesian4, right?: Cartesian4): boolean

      public static equalsEpsilon(left: Cartesian4, right: Cartesian4, relativeEpsilon: number, absoluteEpsilon?: number): boolean
      public x: number
      public y: number
      public z: number
      public w: number

      constructor(x?: number, y?: number, z?: number, w?: number);

      public clone(result?: Cartesian4): Cartesian4

      public equals(right?: Cartesian4): boolean

      public equalsEpsilon(right: Cartesian4, relativeEpsilon: number, absoluteEpsilon?: number): boolean

      public toString(): string
  }

  class Cartographic {
      public static ZERO: Cartographic

      public static fromRadians(longitude: number, latitude: number, height?: number, result?: Cartographic): Cartographic

      public static fromCartesian(cartesian: Cartesian3, ellipsoid?: Ellipsoid, result?: Cartographic): Cartographic

      public static fromDegrees(longitude: number, latitude: number, height?: number, result?: Cartographic): Cartographic

      public static clone(cartographic: Cartographic, result?: Cartographic): Cartographic

      public static equals(left?: Cartographic, right?: Cartographic): boolean

      public static equalsEpsilon(left: Cartographic, right: Cartographic, epsilon: number): boolean
      public longitude: number
      public latitude: number
      public height: number

      constructor(longitude?: number, latitude?: number, height?: number);

      public clone(result?: Cartographic): Cartographic

      public equals(right?: Cartographic): boolean

      public equalsEpsilon(right: Cartographic, epsilon: number): boolean

      public toString(): string
  }

  class CartographicGeocoderService implements GeocoderService {
      public geocode(query: string): Promise<GeocoderResult[]>
  }

  class CatmullRomSpline {
      public times: number[]
      public points: Cartesian3[]
      public firstTangent: Cartesian3
      public lastTangent: Cartesian3

      constructor(options: { times: number[]; points: Cartesian3[]; firstTangent?: Cartesian3; lastTangent?: Cartesian3 });

      public findTimeInterval(time: number): number

      public evaluate(time: number, result?: Cartesian3): Cartesian3
  }

  class CesiumTerrainProvider extends TerrainProvider {
      public errorEvent: Event
      public credit: Credit
      public tilingScheme: GeographicTilingScheme
      public ready: boolean
      public hasWaterMask: boolean
      public hasVertexNormals: boolean
      public requestVertexNormals: boolean
      public requestWaterMask: boolean

      constructor(options: {
          url: string;
          proxy?: Proxy;
          requestVertexNormals?: boolean;
          requestWaterMask?: boolean;
          ellipsoid?: Ellipsoid;
          credit?: Credit | string;
      });

      public requestTileGeometry(x: number, y: number, level: number, request: Request): Promise<TerrainData>

      public getLevelMaximumGeometricError(level: number): number

      public getTileDataAvailable(x: number, y: number, level: number): boolean
  }

  class Cesium3DTileset {
      public readonly url: string
      public show: boolean
      public modelMatrix: Matrix4
      public shadows: ShadowMode
      public maximumScreenSpaceError: number
      public maximumMemoryUsage: number
      public cullWithChildrenBounds: boolean
      public dynamicScreenSpaceError: boolean
      public dynamicScreenSpaceErrorDensity: number
      public dynamicScreenSpaceErrorFactor: number
      public dynamicScreenSpaceErrorHeightFalloff: number
      public skipLevelOfDetail: boolean
      public baseScreenSpaceError: number
      public skipScreenSpaceErrorFactor: number
      public skipLevels: number
      public immediatelyLoadDesiredLevelOfDetail: boolean
      public loadSiblings: boolean
      public debugFreezeFrame: boolean
      public debugColorizeTiles: boolean
      public debugWireframe: boolean
      public debugShowBoundingVolume: boolean
      public debugShowContentBoundingVolume: boolean
      public debugShowViewerRequestVolume: boolean
      public debugShowGeometricError: boolean
      public debugShowRenderingStatistics: boolean
      public debugShowMemoryUsage: boolean
      public debugShowUrl: boolean
      public pointCloudShading: PointCloudShading
      public readonly ready: boolean
      public readonly readyPromise: Promise<Cesium3DTileset>

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
      public static CAST_ONLY: number
      public static DISABLED: number
      public static ENABLED: number
      public static RECEIVE_ONLY: number
  }

  class CircleGeometry {
      public static packedLength: number

      public static createGeometry(circleGeometry: CircleGeometry): Geometry | undefined

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: CircleGeometry): CircleGeometry

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
  }

  class CircleOutlineGeometry {
      public static packedLength: number

      public static createGeometry(circleGeometry: CircleOutlineGeometry): Geometry | undefined

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: CircleOutlineGeometry): CircleOutlineGeometry

      constructor(options: {
          center: Cartesian3;
          radius: number;
          ellipsoid?: Ellipsoid;
          height?: number;
          granularity?: number;
          extrudedHeight?: number;
          numberOfVerticalLines?: number
      });
  }

  class ClassificationType {
      public static BOTH: number
      public static CESIUM_3D_TILE: number
      public static TERRAIN: number
  }

  class Clock {
      public startTime: JulianDate
      public stopTime: JulianDate
      public currentTime: JulianDate
      public multiplier: number
      public clockStep: ClockStep
      public clockRange: ClockRange
      public canAnimate: boolean
      public shouldAnimate: boolean
      public onTick: Event

      constructor(options: { startTime?: JulianDate; stopTime?: JulianDate; currentTime?: JulianDate; multiplier?: number; clockStep?: ClockStep; clockRange?: ClockRange; canAnimate?: boolean; shouldAnimate?: boolean });

      public tick(): JulianDate
  }

  class Color extends MaterialProperty {
      public static packedLength: number
      public static ALICEBLUE: Color
      public static ANTIQUEWHITE: Color
      public static AQUA: Color
      public static AQUAMARINE: Color
      public static AZURE: Color
      public static BEIGE: Color
      public static BISQUE: Color
      public static BLACK: Color
      public static BLANCHEDALMOND: Color
      public static BLUE: Color
      public static BLUEVIOLET: Color
      public static BROWN: Color
      public static BURLYWOOD: Color
      public static CADETBLUE: Color
      public static CHARTREUSE: Color
      public static CHOCOLATE: Color
      public static CORAL: Color
      public static CORNFLOWERBLUE: Color
      public static CORNSILK: Color
      public static CRIMSON: Color
      public static CYAN: Color
      public static DARKBLUE: Color
      public static DARKCYAN: Color
      public static DARKGOLDENROD: Color
      public static DARKGRAY: Color
      public static DARKGREEN: Color
      public static DARKGREY: Color
      public static DARKKHAKI: Color
      public static DARKMAGENTA: Color
      public static DARKOLIVEGREEN: Color
      public static DARKORANGE: Color
      public static DARKORCHID: Color
      public static DARKRED: Color
      public static DARKSALMON: Color
      public static DARKSEAGREEN: Color
      public static DARKSLATEBLUE: Color
      public static DARKSLATEGRAY: Color
      public static DARKSLATEGREY: Color
      public static DARKTURQUOISE: Color
      public static DARKVIOLET: Color
      public static DEEPPINK: Color
      public static DEEPSKYBLUE: Color
      public static DIMGRAY: Color
      public static DIMGREY: Color
      public static DODGERBLUE: Color
      public static FIREBRICK: Color
      public static FLORALWHITE: Color
      public static FORESTGREEN: Color
      public static FUSCHIA: Color
      public static GAINSBORO: Color
      public static GHOSTWHITE: Color
      public static GOLD: Color
      public static GOLDENROD: Color
      public static GRAY: Color
      public static GREEN: Color
      public static GREENYELLOW: Color
      public static GREY: Color
      public static HONEYDEW: Color
      public static HOTPINK: Color
      public static INDIANRED: Color
      public static INDIGO: Color
      public static IVORY: Color
      public static KHAKI: Color
      public static LAVENDER: Color
      public static LAVENDAR_BLUSH: Color
      public static LAWNGREEN: Color
      public static LEMONCHIFFON: Color
      public static LIGHTBLUE: Color
      public static LIGHTCORAL: Color
      public static LIGHTCYAN: Color
      public static LIGHTGOLDENRODYELLOW: Color
      public static LIGHTGRAY: Color
      public static LIGHTGREEN: Color
      public static LIGHTGREY: Color
      public static LIGHTPINK: Color
      public static LIGHTSEAGREEN: Color
      public static LIGHTSKYBLUE: Color
      public static LIGHTSLATEGRAY: Color
      public static LIGHTSLATEGREY: Color
      public static LIGHTSTEELBLUE: Color
      public static LIGHTYELLOW: Color
      public static LIME: Color
      public static LIMEGREEN: Color
      public static LINEN: Color
      public static MAGENTA: Color
      public static MAROON: Color
      public static MEDIUMAQUAMARINE: Color
      public static MEDIUMBLUE: Color
      public static MEDIUMORCHID: Color
      public static MEDIUMPURPLE: Color
      public static MEDIUMSEAGREEN: Color
      public static MEDIUMSLATEBLUE: Color
      public static MEDIUMSPRINGGREEN: Color
      public static MEDIUMTURQUOISE: Color
      public static MEDIUMVIOLETRED: Color
      public static MIDNIGHTBLUE: Color
      public static MINTCREAM: Color
      public static MISTYROSE: Color
      public static MOCCASIN: Color
      public static NAVAJOWHITE: Color
      public static NAVY: Color
      public static OLDLACE: Color
      public static OLIVE: Color
      public static OLIVEDRAB: Color
      public static ORANGE: Color
      public static ORANGERED: Color
      public static ORCHID: Color
      public static PALEGOLDENROD: Color
      public static PALEGREEN: Color
      public static PALETURQUOISE: Color
      public static PALEVIOLETRED: Color
      public static PAPAYAWHIP: Color
      public static PEACHPUFF: Color
      public static PERU: Color
      public static PINK: Color
      public static PLUM: Color
      public static POWDERBLUE: Color
      public static PURPLE: Color
      public static RED: Color
      public static ROSYBROWN: Color
      public static ROYALBLUE: Color
      public static SADDLEBROWN: Color
      public static SALMON: Color
      public static SANDYBROWN: Color
      public static SEAGREEN: Color
      public static SEASHELL: Color
      public static SIENNA: Color
      public static SILVER: Color
      public static SKYBLUE: Color
      public static SLATEBLUE: Color
      public static SLATEGRAY: Color
      public static SLATEGREY: Color
      public static SNOW: Color
      public static SPRINGGREEN: Color
      public static STEELBLUE: Color
      public static TAN: Color
      public static TEAL: Color
      public static THISTLE: Color
      public static TOMATO: Color
      public static TURQUOISE: Color
      public static VIOLET: Color
      public static WHEAT: Color
      public static WHITE: Color
      public static WHITESMOKE: Color
      public static YELLOW: Color
      public static YELLOWGREEN: Color
      public static TRANSPARENT: Color

      public static fromCartesian4(cartesian: Cartesian4, result?: Color): Color

      public static fromBytes(red?: number, green?: number, blue?: number, alpha?: number, result?: Color): Color

      public static fromAlpha(color: Color, alpha: number, result?: Color): Color

      public static fromRgba(rgba: number): Color

      public static fromHsl(hue?: number, saturation?: number, lightness?: number, alpha?: number): Color

      public static fromRandom(options?: { red?: number; minimumRed?: number; maximumRed?: number; green?: number; minimumGreen?: number; maximumGreen?: number; blue?: number; minimumBlue?: number; maximumBlue?: number; alpha?: number; minimumAlpha?: number; maximumAlpha?: number }, result?: Color): Color

      public static fromCssColorString(color: string): Color

      public static pack(value: Color, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Color): Color

      public static byteToFloat(number: number): number

      public static floatToByte(number: number): number

      public static clone(color: Color, result?: Color): Color

      public static equals(left: Color, right: Color): boolean
      public red: number
      public green: number
      public blue: number
      public alpha: number

      constructor(red?: number, green?: number, blue?: number, alpha?: number);

      public clone(result?: Color): Color

      public equals(other: Color): boolean

      public equalsEpsilon(other: Color, epsilon?: number): boolean

      public toString(): string

      public toCssColorString(): string

      public toBytes(result?: number[]): number[]

      public toRgba(): number

      public brighten(magnitude: number, result: Color): Color

      public darken(magnitude: number, result: Color): Color

      public withAlpha(alpha: number, result?: Color): Color
  }

  class ColorGeometryInstanceAttribute {

      public static fromColor(color: Color): ColorGeometryInstanceAttribute

      public static toValue(color: Color, result?: Uint8Array): Uint8Array
      public value: Uint8Array
      public componentDatatype: ComponentDatatype
      public componentsPerAttribute: number
      public normalize: boolean

      constructor(red?: number, green?: number, blue?: number, alpha?: number);
  }

  class CorridorGeometry {

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: CorridorGeometry): CorridorGeometry

      public static createGeometry(corridorGeometry: CorridorGeometry): Geometry | undefined
      public packedLength: number

      constructor(options: { positions: Cartesian3[]; width: number; ellipsoid?: Ellipsoid; granularity?: number; height?: number; extrudedHeight?: number; vertexFormat?: VertexFormat; cornerType?: CornerType });
  }

  class CorridorOutlineGeometry {

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: CorridorOutlineGeometry): CorridorOutlineGeometry

      public static createGeometry(corridorOutlineGeometry: CorridorOutlineGeometry): Geometry | undefined
      public packedLength: number

      constructor(options: { positions: Cartesian3[]; width: number; ellipsoid?: Ellipsoid; granularity?: number; height?: number; extrudedHeight?: number; cornerType?: CornerType });
  }

  class Credit {
      public static equals(left: Credit, right: Credit): boolean
      public text: string
      public imageUrl: string
      public link: string

      constructor(text?: string, imageUrl?: string, link?: string);

      public hasImage(): boolean

      public hasLink(): boolean

      public equals(credits: Credit): boolean
  }

  class CylinderGeometry {
      public static packedLength: number

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: CylinderGeometry): CylinderGeometry

      public static createGeometry(cylinderGeometry: CylinderGeometry): Geometry | undefined

      constructor(options: { length: number; topRadius: number; bottomRadius: number; slices?: number; vertexFormat?: VertexFormat });
  }

  class CylinderOutlineGeometry {
      public static packedLength: number

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: CylinderOutlineGeometry): CylinderOutlineGeometry

      public static createGeometry(cylinderGeometry: CylinderOutlineGeometry): Geometry | undefined

      constructor(options: { length: number; topRadius: number; bottomRadius: number; slices?: number; numberOfVerticalLines?: number });
  }

  class DefaultProxy {
      constructor(proxy: string);

      public getURL(resource: string): string
  }

  class DeveloperError {
      public name: string
      public message: string
      public stack: string

      constructor(message?: string);
  }

  class DistanceDisplayCondition {

      public static clone(value?: DistanceDisplayCondition, result?: DistanceDisplayCondition): DistanceDisplayCondition

      public static equals(left: DistanceDisplayCondition, right: DistanceDisplayCondition): boolean
      public near: number
      public far: number

      constructor(near?: number, far?: number);

      public clone(result?: DistanceDisplayCondition): DistanceDisplayCondition

      public equals(other: DistanceDisplayCondition): boolean
  }

  class EllipseGeometry {
      public static packedLength: number

      public static createGeometry(ellipseGeometry: EllipseGeometry): Geometry | undefined

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: EllipseGeometry): EllipseGeometry

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
  }

  class EllipseOutlineGeometry {
      public static packedLength: number

      public static createGeometry(ellipseGeometry: EllipseOutlineGeometry): Geometry | undefined

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: EllipseOutlineGeometry): EllipseOutlineGeometry

      constructor(options: { center: Cartesian3; semiMajorAxis: number; semiMinorAxis: number; ellipsoid?: Ellipsoid; height?: number; extrudedHeight?: number; rotation?: number; granularity?: number; numberOfVerticalLines?: number });
  }

  class Ellipsoid {
      public static MOON: Ellipsoid
      public static packedLength: number
      public static UNIT_SPHERE: Ellipsoid
      public static WGS84: Ellipsoid

      public static clone(ellipsoid: Ellipsoid, result?: Ellipsoid): Ellipsoid

      public static fromCartesian3(radii?: Cartesian3): Ellipsoid

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Ellipsoid): Ellipsoid
      public minimumRadius: number
      public maximumRadius: number
      public oneOverRadii: Cartesian3
      public oneOverRadiiSquared: Cartesian3
      public radii: Cartesian3
      public radiiSquared: Cartesian3
      public radiiToTheFourth: Cartesian3

      constructor(x?: number, y?: number, z?: number);

      public cartesianArrayToCartographicArray(cartesians: Cartesian3[], result?: Cartographic[]): Cartographic[]

      public cartesianToCartographic(cartesian: Cartesian3, result?: Cartographic): Cartographic

      public cartographicArrayToCartesianArray(cartographics: Cartographic[], result?: Cartesian3[]): Cartesian3[]

      public cartographicToCartesian(cartographic: Cartographic, result?: Cartesian3): Cartesian3

      public clone(result?: Ellipsoid): Ellipsoid

      public equals(right?: Ellipsoid): boolean

      public geocentricSurfaceNormal(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public geodeticSurfaceNormalCartographic(cartographic: Cartographic, result?: Cartesian3): Cartesian3

      public geodeticSurfaceNormal(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public scaleToGeodeticSurface(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public scaleToGeocentricSurface(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public transformPositionToScaledSpace(position: Cartesian3, result?: Cartesian3): Cartesian3

      public transformPositionFromScaledSpace(position: Cartesian3, result?: Cartesian3): Cartesian3

      public getSurfaceNormalIntersectionWithZAxis(position: Cartesian3, buffer: number, result: Cartesian3): Cartesian3

      public toString(): string
  }

  class EllipsoidGeodesic {
      public surfaceDistance: number
      public start: Cartographic
      public end: Cartographic
      public startHeading: number
      public endHeading: number

      constructor(start?: Cartographic, end?: Cartographic, ellipsoid?: Ellipsoid);

      public setEndPoints(start: Cartographic, end: Cartographic): void

      public interpolateUsingFraction(fraction: number): Cartographic

      public interpolateUsingSurfaceDistance(distance: number): Cartographic
  }

  class EllipsoidGeometry {
      public static packedLength: number

      public static createGeometry(ellipsoidGeometry: EllipsoidGeometry): Geometry | undefined

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: EllipsoidGeometry): EllipsoidGeometry

      constructor(options?: { radii?: Cartesian3; stackPartitions?: number; slicePartitions?: number; vertexFormat?: VertexFormat });
  }

  class EllipsoidOutlineGeometry {
      public static packedLength: number

      public static createGeometry(ellipsoidGeometry: EllipsoidOutlineGeometry): Geometry | undefined

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: EllipsoidOutlineGeometry): EllipsoidOutlineGeometry

      constructor(options?: { radii?: Cartesian3; stackPartitions?: number; slicePartitions?: number; subdivisions?: number });
  }

  class EllipsoidTangentPlane {

      public static fromPoints(ellipsoid: Ellipsoid, cartesians: Cartesian3): EllipsoidTangentPlane
      public ellipsoid: Ellipsoid
      public origin: Cartesian3

      constructor(ellipsoid: Ellipsoid, origin: Cartesian3);

      public projectPointOntoPlane(cartesian: Cartesian3, result?: Cartesian2): Cartesian2

      public projectPointsOntoPlane(cartesians: Cartesian3[], result?: Cartesian2[]): Cartesian2[]

      public projectPointsOntoEllipsoid(cartesians: Cartesian2[], result?: Cartesian3[]): Cartesian3[]
  }

  class EllipsoidTerrainProvider extends TerrainProvider {
      public credit: Credit
      public errorEvent: Event
      public hasWaterMask: boolean
      public hasVertexNormals: boolean
      public ready: boolean
      public readonly readyPromise: Promise<boolean>
      public tilingScheme: GeographicTilingScheme

      constructor(options?: { tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid });

      public getLevelMaximumGeometricError(level: number): number

      public getTileDataAvailable(x: number, y: number, level: number): boolean

      public requestTileGeometry(x: number, y: number, level: number, request: Request): Promise<TerrainData>
  }

  class Event {
      public numberOfListeners: number

      public addEventListener(listener: Function, scope?: any): Event.RemoveCallback

      public removeEventListener(listener: Function, scope?: any): boolean

      public raiseEvent(...args: any[]): void
  }

  namespace Event {
      type RemoveCallback = () => void
  }

  class EventHelper {
      public add(event: Event, listener: Function, scope?: any): EventHelper.RemoveCallback

      public removeAll(): void
  }

  namespace EventHelper {
      type RemoveCallback = () => void
  }

  class GeographicProjection {
      public ellipsoid: Ellipsoid

      constructor(ellipsoid?: Ellipsoid);

      public project(cartographic: Cartographic, result?: Cartesian3): Cartesian3

      public unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic
  }

  class GeographicTilingScheme {
      public ellipsoid: Ellipsoid
      public rectangle: Rectangle
      public projection: MapProjection

      constructor(options?: { ellipsoid?: Ellipsoid; rectangle?: Rectangle; numberOfLevelZeroTilesX?: number; numberOfLevelZeroTilesY?: number });

      public getNumberOfXTilesAtLevel(level: number): number

      public getNumberOfYTilesAtLevel(level: number): number

      public rectangleToNativeRectangle(rectangle: Rectangle, result?: Rectangle): Rectangle

      public tileXYToNativeRectangle(x: number, y: number, level: number, result?: any): Rectangle

      public tileXYToRectangle(x: number, y: number, level: number, result?: any): Rectangle

      public positionToTileXY(position: Cartographic, level: number, result?: Cartesian2): Cartesian2
  }

  class Geometry {

      public static computeNumberOfVertices(geometry: Cartesian3): number
      public attributes: GeometryAttributes
      public boundingSphere: BoundingSphere
      public indices: any[]
      public primitiveType: PrimitiveType

      constructor(options: {
          attributes: GeometryAttributes;
          primitiveType?: PrimitiveType;
          indices?: Uint16Array | Uint32Array;
          boundingSphere?: BoundingSphere
      });
  }

  class GeometryAttribute {
      public componentDatatype: ComponentDatatype
      public componentsPerAttribute: number
      public normalize: boolean
      public values: any[]

      constructor(options?: { componentDatatype?: ComponentDatatype; componentsPerAttribute?: number; normalize?: boolean; values?: number[] });
  }

  class GeometryAttributes {
      public bitangent: GeometryAttribute
      public color: GeometryAttribute
      public normal: GeometryAttribute
      public position: GeometryAttribute
      public st: GeometryAttribute
      public tangent: GeometryAttribute
  }

  class GeometryInstance {
      public geometry: Geometry
      public modelMatrix: Matrix4
      public id: any
      public attributes: any

      constructor(options: { geometry: Geometry | any; modelMatrix?: Matrix4; id?: any; attributes?: any });
  }

  class GeometryInstanceAttribute {
      public componentDatatype: ComponentDatatype
      public componentsPerAttribute: number
      public normalize: boolean
      public value: number[]

      constructor(options: { componentDatatype?: ComponentDatatype; componentsPerAttribute?: number; normalize?: boolean; value?: number[] });
  }

  class GregorianDate {
      public year: number
      public month: number
      public day: number
      public hour: number
      public minute: number
      public second: number
      public millisecond: number
      public isLeapSecond: boolean
  }

  class HeightmapTerrainData {
      public waterMask: Uint8Array | HTMLImageElement | HTMLCanvasElement

      constructor(options: { buffer: Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Float64Array; width: number; height: number; childTileMask?: number; structure?: any; structureheightScale?: number; structureheightOffset?: number; structureelementsPerHeight?: number; structurestride?: number; structureelementMultiplier?: number; structureisBigEndian?: boolean; createdByUpsampling?: boolean });

      public createMesh(tilingScheme: TilingScheme, x: number, y: number, level: number): Promise<TerrainMesh>

      public interpolateHeight(rectangle: Rectangle, longitude: number, latitude: number): number

      public upsample(tilingScheme: TilingScheme, thisX: number, thisY: number, thisLevel: number, descendantX: number, descendantY: number, descendantLevel: number): Promise<HeightmapTerrainData>

      public isChildAvailable(thisX: number, thisY: number, childX: number, childY: number): boolean

      public wasCreatedByUpsampling(): boolean
  }

  class HermiteSpline {

      public static createC1(): HermiteSpline

      public static createNaturalCubic(): HermiteSpline | LinearSpline

      public static createClampedCubic(): HermiteSpline | LinearSpline
      public times: number[]
      public points: Cartesian3[]
      public inTangents: Cartesian3[]
      public outTangents: Cartesian3[]

      constructor(options: { times: number[]; points: Cartesian3[]; inTangents: Cartesian3[]; outTangents: Cartesian3[] });

      public findTimeInterval(time: number): number

      public evaluate(time: number, result?: Cartesian3): Cartesian3
  }

  class Interval {
      public start: number
      public stop: number

      constructor(start?: number, stop?: number);
  }

  class JulianDate {
      public static leapSeconds: LeapSecond[]

      public static fromDate(date: Date, result?: JulianDate): JulianDate

      public static fromIso8601(iso8601String: string, result?: JulianDate): JulianDate

      public static now(result?: JulianDate): JulianDate

      public static toGregorianDate(julianDate: JulianDate, result?: GregorianDate): GregorianDate

      public static toDate(julianDate: JulianDate): Date

      public static toIso8601(julianDate: JulianDate, precision?: number): string

      public static clone(julianDate: JulianDate, result?: JulianDate): JulianDate

      public static compare(left: JulianDate, right: JulianDate): number

      public static equals(left?: JulianDate, right?: JulianDate): boolean

      public static equalsEpsilon(left: JulianDate, right: JulianDate, epsilon: number): boolean

      public static totalDays(julianDate: JulianDate): number

      public static secondsDifference(left: JulianDate, right: JulianDate): number

      public static daysDifference(left: JulianDate, right: JulianDate): number

      public static computeTaiMinusUtc(julianDate: JulianDate): number

      public static addSeconds(julianDate: JulianDate, seconds: number, result: JulianDate): JulianDate

      public static addMinutes(julianDate: JulianDate, minutes: number, result: JulianDate): JulianDate

      public static addHours(julianDate: JulianDate, hours: number, result: JulianDate): JulianDate

      public static addDays(julianDate: JulianDate, days: number, result: JulianDate): JulianDate

      public static lessThan(left: JulianDate, right: JulianDate): boolean

      public static lessThanOrEquals(left: JulianDate, right: JulianDate): boolean

      public static greaterThan(left: JulianDate, right: JulianDate): boolean

      public static greaterThanOrEquals(left: JulianDate, right: JulianDate): boolean
      public dayNumber: number
      public secondsOfDay: number

      constructor(julianDayNumber: number, secondsOfDay: number, timeStandard?: TimeStandard);

      public clone(result?: JulianDate): JulianDate

      public equals(right?: JulianDate): boolean

      public equalsEpsilon(right: JulianDate, epsilon: number): boolean

      public toString(): string
  }

  class LeapSecond {
      public julianDate: JulianDate
      public offset: number

      constructor(date?: JulianDate, offset?: number);
  }

  class LinearSpline {
      public times: number[]
      public points: Cartesian3[]

      constructor();

      public findTimeInterval(time: number): number

      public evaluate(time: number, result?: Cartesian3): Cartesian3
  }

  class MapProjection {
      public ellipsoid: Ellipsoid

      public project(cartographic: Cartographic, result?: Cartesian3): Cartesian3

      public unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic
  }

  class Matrix2 {
      public static packedLength: number
      public static IDENTITY: Matrix2
      public static COLUMN0ROW0: number
      public static COLUMN0ROW1: number
      public static COLUMN1ROW0: number
      public static COLUMN1ROW1: number

      public static pack(value: Matrix2, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Matrix2): Matrix2

      public static clone(matrix: Matrix2, result?: Matrix2): Matrix2

      public static fromArray(array: number[], startingIndex?: number, result?: Matrix2): Matrix2

      public static fromColumnMajorArray(values: number[], result?: Matrix2): Matrix2

      public static fromRowMajorArray(values: number[], result?: Matrix2): Matrix2

      public static fromScale(scale: Cartesian2, result?: Matrix2): Matrix2

      public static fromUniformScale(scale: number, result?: Matrix2): Matrix2

      public static fromRotation(angle: number, result?: Matrix2): Matrix2

      public static toArray(matrix: Matrix2, result?: number[]): number[]

      public static getElementIndex(row: number, column: number): number

      public static getColumn(matrix: Matrix2, index: number, result: Cartesian2): Cartesian2

      public static setColumn(matrix: Matrix2, index: number, cartesian: Cartesian2, result: Cartesian2): Matrix2

      public static getRow(matrix: Matrix2, index: number, result: Cartesian2): Cartesian2

      public static setRow(matrix: Matrix2, index: number, cartesian: Cartesian2, result: Matrix2): Matrix2

      public static getScale(matrix: Matrix2, result: Cartesian2): Cartesian2

      public static getMaximumScale(matrix: Matrix2): number

      public static multiply(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2

      public static add(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2

      public static subtract(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2

      public static multiplyByVector(matrix: Matrix2, cartesian: Cartesian2, result: Cartesian2): Cartesian2

      public static multiplyByScalar(matrix: Matrix2, scalar: number, result: Matrix2): Matrix2

      public static negate(matrix: Matrix2, result: Matrix2): Matrix2

      public static transpose(matrix: Matrix2, result: Matrix2): Matrix2

      public static abs(matrix: Matrix2, result: Matrix2): Matrix2

      public static equals(left?: Matrix2, right?: Matrix2): boolean

      public static equalsEpsilon(left: Matrix2, right: Matrix2, epsilon: number): boolean

      constructor(column0Row0?: number, column1Row0?: number, column0Row1?: number, column1Row1?: number);

      public clone(result?: Matrix2): Matrix2

      public equals(right?: Matrix2): boolean

      public equalsEpsilon(right: Matrix2, epsilon: number): boolean

      public toString(): string
  }

  class Matrix3 {
      public static packedLength: number
      public static IDENTITY: Matrix3
      public static COLUMN0ROW0: number
      public static COLUMN0ROW1: number
      public static COLUMN0ROW2: number
      public static COLUMN1ROW0: number
      public static COLUMN1ROW1: number
      public static COLUMN1ROW2: number
      public static COLUMN2ROW0: number
      public static COLUMN2ROW1: number
      public static COLUMN2ROW2: number

      public static pack(value: Matrix3, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Matrix3): Matrix3

      public static clone(matrix: Matrix3, result?: Matrix3): Matrix3

      public static fromArray(array: number[], startingIndex?: number, result?: Matrix3): Matrix3

      public static fromColumnMajorArray(values: number[], result?: Matrix3): Matrix3

      public static fromRowMajorArray(values: number[], result?: Matrix3): Matrix3

      public static fromQuaternion(quaternion: Quaternion): Matrix3

      public static fromScale(scale: Cartesian3, result?: Matrix3): Matrix3

      public static fromUniformScale(scale: number, result?: Matrix3): Matrix3

      public static fromCrossProduct(the: Cartesian3, result?: Matrix3): Matrix3

      public static fromRotationX(angle: number, result?: Matrix3): Matrix3

      public static fromRotationY(angle: number, result?: Matrix3): Matrix3

      public static fromRotationZ(angle: number, result?: Matrix3): Matrix3

      public static toArray(matrix: Matrix3, result?: number[]): number[]

      public static getElementIndex(row: number, column: number): number

      public static getColumn(matrix: Matrix3, index: number, result: Cartesian3): Cartesian3

      public static setColumn(matrix: Matrix3, index: number, cartesian: Cartesian3, result: Cartesian3): Matrix3

      public static getRow(matrix: Matrix3, index: number, result: Cartesian3): Cartesian3

      public static setRow(matrix: Matrix3, index: number, cartesian: Cartesian3, result: Cartesian3): Matrix3

      public static getScale(matrix: Matrix3, result: Cartesian3): Cartesian3

      public static getMaximumScale(matrix: Matrix3): number

      public static multiply(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3

      public static add(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3

      public static subtract(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3

      public static multiplyByVector(matrix: Matrix3, cartesian: Cartesian3, result: Cartesian3): Cartesian3

      public static multiplyByScalar(matrix: Matrix3, scalar: number, result: Matrix3): Matrix3

      public static negate(matrix: Matrix3, result: Matrix3): Matrix3

      public static transpose(matrix: Matrix3, result: Matrix3): Matrix3

      public static computeEigenDecomposition(matrix: Matrix3, result?: any): any

      public static abs(matrix: Matrix3, result: Matrix3): Matrix3

      public static determinant(matrix: Matrix3): number

      public static inverse(matrix: Matrix3, result: Matrix3): Matrix3

      public static equals(left?: Matrix3, right?: Matrix3): boolean

      public static equalsEpsilon(left: Matrix3, right: Matrix3, epsilon: number): boolean

      constructor(column0Row0?: number, column1Row0?: number, column2Row0?: number, column0Row1?: number, column1Row1?: number, column2Row1?: number, column0Row2?: number, column1Row2?: number, column2Row2?: number);

      public clone(result?: Matrix3): Matrix3

      public equals(right?: Matrix3): boolean

      public equalsEpsilon(right: Matrix3, epsilon: number): boolean

      public toString(): string
  }

  class Matrix4 {
      public static packedLength: number
      public static IDENTITY: Matrix4
      public static COLUMN0ROW0: number
      public static COLUMN0ROW1: number
      public static COLUMN0ROW2: number
      public static COLUMN0ROW3: number
      public static COLUMN1ROW0: number
      public static COLUMN1ROW1: number
      public static COLUMN1ROW2: number
      public static COLUMN1ROW3: number
      public static COLUMN2ROW0: number
      public static COLUMN2ROW1: number
      public static COLUMN2ROW2: number
      public static COLUMN2ROW3: number
      public static COLUMN3ROW0: number
      public static COLUMN3ROW1: number
      public static COLUMN3ROW2: number
      public static COLUMN3ROW3: number

      public static pack(value: Matrix4, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Matrix4): Matrix4

      public static clone(matrix: Matrix4, result?: Matrix4): Matrix4

      public static fromArray(array: number[], startingIndex?: number, result?: Matrix4): Matrix4

      public static fromColumnMajorArray(values: number[], result?: Matrix4): Matrix4

      public static fromRowMajorArray(values: number[], result?: Matrix4): Matrix4

      public static fromRotationTranslation(rotation: Matrix3, translation?: Cartesian3, result?: Matrix4): Matrix4

      public static fromTranslationQuaternionRotationScale(translation: Cartesian3, rotation: Quaternion, scale: Cartesian3, result?: Matrix4): Matrix4

      public static fromTranslation(translation: Cartesian3, result?: Matrix4): Matrix4

      public static fromScale(scale: Cartesian3, result?: Matrix4): Matrix4

      public static fromUniformScale(scale: number, result?: Matrix4): Matrix4

      public static fromCamera(camera: Camera, result?: Matrix4): Matrix4

      public static computePerspectiveFieldOfView(fovY: number, aspectRatio: number, near: number, far: number, result: Matrix4): Matrix4

      public static computeOrthographicOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result: Matrix4): Matrix4

      public static computePerspectiveOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result: Matrix4): Matrix4

      public static computeInfinitePerspectiveOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result: Matrix4): Matrix4

      public static computeViewportTransformation(viewport: any, nearDepthRange: number, farDepthRange: number, result: Matrix4): Matrix4

      public static toArray(matrix: Matrix4, result?: number[]): number[]

      public static getElementIndex(row: number, column: number): number

      public static getColumn(matrix: Matrix4, index: number, result: Cartesian4): Cartesian4

      public static setColumn(matrix: Matrix4, index: number, cartesian: Cartesian4, result: Cartesian4): Matrix4

      public static getRow(matrix: Matrix4, index: number, result: Cartesian4): Cartesian4

      public static setRow(matrix: Matrix4, index: number, cartesian: Cartesian4, result: Cartesian4): Matrix4

      public static getScale(matrix: Matrix4, result: Cartesian3): Cartesian3

      public static getMaximumScale(matrix: Matrix4): number

      public static multiply(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4

      public static add(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4

      public static subtract(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4

      public static multiplyTransformation(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4

      public static multiplyByMatrix3(matrix: Matrix4, rotation: Matrix3, result: Matrix4): Matrix4

      public static multiplyByTranslation(matrix: Matrix4, translation: Cartesian3, result: Matrix4): Matrix4

      public static multiplyByUniformScale(matrix: Matrix4, scale: number, result: Matrix4): Matrix4

      public static multiplyByScale(matrix: Matrix4, scale: Cartesian3, result: Matrix4): Matrix4

      public static multiplyByVector(matrix: Matrix4, cartesian: Cartesian4, result: Cartesian4): Cartesian4

      public static multiplyByPointAsVector(matrix: Matrix4, cartesian: Cartesian3, result: Cartesian3): Cartesian3

      public static multiplyByPoint(matrix: Matrix4, cartesian: Cartesian3, result: Cartesian3): Cartesian3

      public static multiplyByScalar(matrix: Matrix4, scalar: number, result: Matrix4): Matrix4

      public static negate(matrix: Matrix4, result: Matrix4): Matrix4

      public static transpose(matrix: Matrix4, result: Matrix4): Matrix4

      public static abs(matrix: Matrix4, result: Matrix4): Matrix4

      public static equals(left?: Matrix4, right?: Matrix4): boolean

      public static equalsEpsilon(left: Matrix4, right: Matrix4, epsilon: number): boolean

      public static getTranslation(matrix: Matrix4, result: Cartesian3): Cartesian3

      public static getRotation(matrix: Matrix4, result: Matrix3): Matrix3

      public static inverse(matrix: Matrix4, result: Matrix4): Matrix4

      public static inverseTransformation(matrix: Matrix4, result: Matrix4): Matrix4

      constructor(column0Row0?: number, column1Row0?: number, column2Row0?: number, column3Row0?: number, column0Row1?: number, column1Row1?: number, column2Row1?: number, column3Row1?: number, column0Row2?: number, column1Row2?: number, column2Row2?: number, column3Row2?: number, column0Row3?: number, column1Row3?: number, column2Row3?: number, column3Row3?: number);

      public clone(result?: Matrix4): Matrix4

      public equals(right?: Matrix4): boolean

      public equalsEpsilon(right: Matrix4, epsilon: number): boolean

      public toString(): string
  }

  class NearFarScalar {
      public static packedLength: number

      public static clone(nearFarScalar: NearFarScalar, result?: NearFarScalar): NearFarScalar

      public static pack(value: NearFarScalar, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: NearFarScalar): NearFarScalar

      public static equals(left?: NearFarScalar, right?: NearFarScalar): boolean
      public near: number
      public nearValue: number
      public far: number
      public farValue: number

      constructor(near?: number, nearValue?: number, far?: number, farValue?: number);

      public clone(result?: NearFarScalar): NearFarScalar

      public equals(right?: NearFarScalar): boolean
  }

  class ObjectOrientedBoundingBox {

      public static fromPoints(positions: Cartesian3[], result?: ObjectOrientedBoundingBox): ObjectOrientedBoundingBox

      public static fromBoundingRectangle(boundingRectangle: BoundingRectangle, rotation?: number): ObjectOrientedBoundingBox

      public static clone(box: ObjectOrientedBoundingBox, result?: ObjectOrientedBoundingBox): ObjectOrientedBoundingBox

      public static intersect(left: ObjectOrientedBoundingBox, right: ObjectOrientedBoundingBox): boolean

      public static equals(left: ObjectOrientedBoundingBox, right: ObjectOrientedBoundingBox): boolean
      public rotation: Matrix3
      public translation: Cartesian3
      public scale: Cartesian3

      constructor(rotation?: Matrix3, translation?: Cartesian3, scale?: Cartesian3);

      public clone(result?: ObjectOrientedBoundingBox): ObjectOrientedBoundingBox

      public equals(right?: ObjectOrientedBoundingBox): boolean
  }

  class Occluder {

      public static computeOccludeePoint(occluderBoundingSphere: BoundingSphere, occludeePosition: Cartesian3, positions: Cartesian3[]): any

      public static computeOccludeePointFromRectangle(rectangle: Rectangle, ellipsoid?: Ellipsoid): any

      public static fromBoundingSphere(occluderBoundingSphere: BoundingSphere, cameraPosition: Cartesian3, result?: Occluder): Occluder
      public cameraPosition: Cartesian3
      public position: Cartesian3
      public radius: number

      constructor(occluderBoundingSphere: BoundingSphere, cameraPosition: Cartesian3);

      public computeVisibility(occludeeBS: BoundingSphere): number

      public isBoundingSphereVisible(occludee: BoundingSphere): boolean

      public isPointVisible(occludee: Cartesian3): boolean
  }

  class PinBuilder {
      public fromColor(color: Color, size: number): HTMLCanvasElement

      public fromUrl(url: string, color: Color, size: number): HTMLCanvasElement | Promise<HTMLCanvasElement>

      public fromMakiIconId(id: string, color: Color, size: number): HTMLCanvasElement | Promise<HTMLCanvasElement>

      public fromText(text: string, color: Color, size: number): HTMLCanvasElement
  }

  class Plane {
      public static ORIGIN_XY_PLANE: Plane
      public static ORIGIN_YZ_PLANE: Plane
      public static ORIGIN_ZX_PLANE: Plane

      public static fromCartesian4(coefficients: Cartesian4, result: Plane): Plane

      public static fromPointNormal(point: Cartesian3, normal: Cartesian3, result?: Plane): Plane

      public static getPointDistance(plane: Plane, point: Cartesian3): number
      public distance: number
      public normal: Cartesian3

      constructor(normal: Cartesian3, distance: number);
  }

  type PointCloudShadingOptions = Partial<{
      attenuation: boolean;
      geometricErrorScale: number;
      maximumAttenuation: number;
      baseResolution: number;
      eyeDomeLighting: boolean;
      eyeDomeLightingStrength: number;
      eyeDomeLightingRadius: number;
  }>

  class PointCloudShading {

      public static isSupported(scene: Scene): boolean

      public attenuation: boolean
      public baseResolution: number
      public eyeDomeLighting: boolean
      public eyeDomeLightingRadius: number
      public eyeDomeLightingStrength: number
      public geometricErrorScale: number
      public maximumAttenuation: number

      constructor(options: PointCloudShadingOptions);
  }

  class PolygonGeometry {

      public static createGeometry(polygonGeometry: PolygonGeometry): Geometry | undefined

      public static fromPositions(options: PolygonGeometryOptions): PolygonGeometry

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: PolygonGeometry): PolygonGeometry
      public packedLength: number

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
  }

  type PolygonGeometryOptions = PolygonOutlineGeometryOptions & {
      closeBottom?: boolean;
      closeTop?: boolean;
      stRotation?: number;
  }

  class PolygonHierarchy extends Property {
      public positions: Cartesian3[]
      public holes: PolygonHierarchy[]

      constructor(positions?: Cartesian3[], holes?: PolygonHierarchy[]);
  }

  class PolygonOutlineGeometry {

      public static createGeometry(polygonGeometry: PolygonOutlineGeometry): Geometry | undefined

      public static fromPositions(options: PolygonOutlineGeometryOptions): PolygonOutlineGeometry

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: PolygonOutlineGeometry): PolygonOutlineGeometry

      public packedLength: number
      constructor(options: { polygonHierarchy: any; height?: number; extrudedHeight?: number; vertexFormat?: VertexFormat; ellipsoid?: Ellipsoid; granularity?: number; perPositionHeight?: boolean });
  }

  interface PolygonOutlineGeometryOptions {
      polygonHierarchy: PolygonHierarchy
      ellipsoid?: Ellipsoid
      extrudedHeight?: number
      granularity?: number
      height?: number
      perPositionHeight?: boolean
      vertexFormat?: VertexFormat
  }

  class PolylineGeometry {

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: PolylineGeometry): PolylineGeometry

      public static createGeometry(polylineGeometry: PolylineGeometry): Geometry | undefined
      public packedLength: number

      constructor(options: { positions: Cartesian3[]; width?: number; colors?: Color[]; colorsPerVertex?: boolean; followSurface?: boolean; granularity?: number; ellipsoid?: Ellipsoid });
  }

  class PolylineVolumeGeometry {

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: PolylineVolumeGeometry): PolylineVolumeGeometry

      public static createGeometry(polylineVolumeGeometry: PolylineVolumeGeometry): Geometry | undefined
      public packedLength: number

      constructor(options: { polylinePositions: Cartesian3[]; shapePositions: Cartesian2[]; ellipsoid?: Ellipsoid; granularity?: number; vertexFormat?: VertexFormat; cornerType?: CornerType });
  }

  class PolylineVolumeOutlineGeometry {

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: PolylineVolumeOutlineGeometry): PolylineVolumeOutlineGeometry

      public static createGeometry(polylineVolumeOutlineGeometry: PolylineVolumeOutlineGeometry): Geometry | undefined
      public packedLength: number

      constructor(options: { polylinePositions: Cartesian3[]; shapePositions: number; ellipsoid?: Ellipsoid; granularity?: number; cornerType?: CornerType });
  }

  class QuantizedMeshTerrainData {
      public waterMask: Uint8Array | HTMLImageElement | HTMLCanvasElement

      constructor(options: { quantizedVertices: Uint16Array; indices: Uint16Array | Uint32Array; minimumHeight: number; maximumHeight: number; boundingSphere: BoundingSphere; horizonOcclusionPoint: Cartesian3; westIndices: number[]; southIndices: number[]; eastIndices: number[]; northIndices: number[]; westSkirtHeight: number; southSkirtHeight: number; eastSkirtHeight: number; northSkirtHeight: number; childTileMask?: number; createdByUpsampling?: boolean; encodedNormals?: Uint8Array; waterMask?: Uint8Array });

      public createMesh(tilingScheme: TilingScheme, x: number, y: number, level: number): Promise<TerrainMesh>

      public upsample(tilingScheme: TilingScheme, thisX: number, thisY: number, thisLevel: number, descendantX: number, descendantY: number, descendantLevel: number): Promise<QuantizedMeshTerrainData>

      public interpolateHeight(rectangle: Rectangle, longitude: number, latitude: number): number

      public isChildAvailable(thisX: number, thisY: number, childX: number, childY: number): boolean

      public wasCreatedByUpsampling(): boolean
  }

  class Quaternion {
      public static packedLength: number
      public static packedInterpolationLength: number
      public static ZERO: Quaternion
      public static IDENTITY: Quaternion

      public static fromAxisAngle(axis: Cartesian3, angle: number, result?: Quaternion): Quaternion

      public static fromRotationMatrix(matrix: Matrix3, result?: Quaternion): Quaternion

      public static fromHeadingPitchRoll(heading: number, pitch: number, roll: number, result: Quaternion): Quaternion

      public static pack(value: Quaternion, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Quaternion): Quaternion

      public static convertPackedArrayForInterpolation(packedArray: number[], startingIndex?: number, lastIndex?: number, result?: number[]): void

      public static unpackInterpolationResult(array: number[], sourceArray: number[], startingIndex?: number, lastIndex?: number, result?: Quaternion): Quaternion

      public static clone(quaternion: Quaternion, result?: Quaternion): Quaternion

      public static conjugate(quaternion: Quaternion, result: Quaternion): Quaternion

      public static magnitudeSquared(quaternion: Quaternion): number

      public static magnitude(quaternion: Quaternion): number

      public static normalize(quaternion: Quaternion, result: Quaternion): Quaternion

      public static inverse(quaternion: Quaternion, result: Quaternion): Quaternion

      public static add(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion

      public static subtract(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion

      public static negate(quaternion: Quaternion, result: Quaternion): Quaternion

      public static dot(left: Quaternion, right: Quaternion): number

      public static multiply(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion

      public static multiplyByScalar(quaternion: Quaternion, scalar: number, result: Quaternion): Quaternion

      public static divideByScalar(quaternion: Quaternion, scalar: number, result: Quaternion): Quaternion

      public static computeAxis(quaternion: Quaternion, result: Cartesian3): Cartesian3

      public static computeAngle(quaternion: Quaternion): number

      public static lerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion

      public static slerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion

      public static log(quaternion: Quaternion, result: Cartesian3): Cartesian3

      public static exp(cartesian: Cartesian3, result: Quaternion): Quaternion

      public static computeInnerQuadrangle(q0: Quaternion, q1: Quaternion, q2: Quaternion, result: Quaternion): Quaternion

      public static squad(q0: Quaternion, q1: Quaternion, s0: Quaternion, s1: Quaternion, t: number, result: Quaternion): Quaternion

      public static fastSlerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion

      public static fastSquad(q0: Quaternion, q1: Quaternion, s0: Quaternion, s1: Quaternion, t: number, result?: Quaternion): Quaternion

      public static equals(left?: Quaternion, right?: Quaternion): boolean

      public static equalsEpsilon(left: Quaternion, right: Quaternion, epsilon: number): boolean
      public x: number
      public y: number
      public z: number
      public w: number

      constructor(x?: number, y?: number, z?: number, w?: number);

      public clone(result?: Quaternion): Quaternion

      public equals(right?: Quaternion): boolean

      public equalsEpsilon(right: Quaternion, epsilon: number): boolean

      public toString(): string
  }

  class QuaternionSpline {
      public times: number[]
      public points: Quaternion[]
      public innerQuadrangles: Quaternion[]

      constructor(options: { times: number[]; points: Quaternion[]; firstInnerQuadrangle?: Quaternion; lastInnerQuadrangle?: Quaternion });

      public findTimeInterval(time: number): number

      public evaluate(time: number, result?: Quaternion): Quaternion
  }

  namespace Queue {
      type Comparator = (a: any, b: any) => number
  }

  class Ray {

      public static getPoint(t: number, result?: Cartesian3): Cartesian3
      public origin: Cartesian3
      public direction: Cartesian3

      constructor(origin?: Cartesian3, direction?: Cartesian3);
  }

  class Rectangle {
      public static packedLength: number
      public static MAX_VALUE: Rectangle

      public static pack(value: Rectangle, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: Rectangle): Rectangle

      public static computeWidth(rectangle: Rectangle): number

      public static computeHeight(rectangle: Rectangle): number

      public static fromDegrees(west?: number, south?: number, east?: number, north?: number, result?: Rectangle): Rectangle

      public static fromCartesianArray(cartesians: Cartesian3[], ellipsoid?: Ellipsoid, result?: Rectangle): Rectangle

      public static fromCartographicArray(cartographics: Cartographic[], result?: Rectangle): Rectangle

      public static clone(rectangle: Rectangle, result?: Rectangle): Rectangle

      public static equals(left?: Rectangle, right?: Rectangle): boolean

      /**
       *
       * @param rectangle
       * @throws {DeveloperError}
       */
      public static validate(rectangle: Rectangle): void

      public static southwest(rectangle: Rectangle, result?: Cartographic): Cartographic

      public static northwest(rectangle: Rectangle, result?: Cartographic): Cartographic

      public static northeast(rectangle: Rectangle, result?: Cartographic): Cartographic

      public static southeast(rectangle: Rectangle, result?: Cartographic): Cartographic

      public static center(rectangle: Rectangle, result?: Cartographic): Cartographic

      public static intersection(rectangle: Rectangle, otherRectangle: Rectangle, result?: Rectangle): Rectangle

      public static contains(rectangle: Rectangle, cartographic: Cartographic): boolean

      public static subsample(rectangle: Rectangle, ellipsoid?: Ellipsoid, surfaceHeight?: number, result?: Cartesian3[]): Cartesian3[]
      public west: number
      public south: number
      public east: number
      public north: number
      public width: number
      public height: number

      constructor(west?: number, south?: number, east?: number, north?: number);

      public clone(result?: Rectangle): Rectangle

      public equals(other?: Rectangle): boolean

      public equalsEpsilon(other: Rectangle, epsilon: number): boolean
  }

  class RectangleGeometry {
      public static packedLength: number

      public static createGeometry(rectangleGeometry: RectangleGeometry): Geometry | undefined

      public static pack(value: BoundingSphere, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: RectangleGeometry): RectangleGeometry

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
  }

  class RectangleOutlineGeometry {
      public static packedLength: number

      public static pack(value: BoundingSphere, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: RectangleGeometry): RectangleGeometry

      public static createGeometry(rectangleGeometry: RectangleOutlineGeometry): Geometry | undefined

      constructor(options: { rectangle: Rectangle; ellipsoid?: Ellipsoid; granularity?: number; height?: number; rotation?: number; extrudedHeight?: number });
  }

  class RequestErrorEvent {
      public statusCode: number
      public response: any
      public responseHeaders: any

      constructor(statusCode?: number, response?: any, responseHeaders?: string | any);

      public toString(): string
  }

  type ResourceCallback = (resource: Resource, error: Error) => boolean | Promise<boolean>

  interface ResourceOptions {
      url: string
      queryParameters?: object
      templateValues?: object
      headers?: object
      proxy?: DefaultProxy
      retryCallback?: ResourceCallback
      retryAttempts?: number
      request?: any // Cesium.Request
  }

  class Resource {
      public readonly queryParameters: any
      public readonly templateValues: any
      public hasHeaders: boolean
      public headers: object
      public isCrossOriginUrl: boolean
      public isDataUri: boolean
      public proxy: DefaultProxy
      public request: Request
      public retryAttempts: number
      public retryCallback: Function
      public url: string
      constructor(options: string | ResourceOptions);

      public addQueryParameters(params: any, useAsDefault?: boolean)
      public addTemplateValues(template: any, useAsDefault?: boolean)
      public appendQueryParameters(params: any)
      public clone(result?: Resource): Resource
      public fetch(options?: any): Promise<any> | undefined
  }


  class RuntimeError {
      public name: string
      public message: string
      public stack: string

      constructor(message?: string);
  }

  class ScreenSpaceEventHandler {
      constructor(element?: HTMLCanvasElement);

      public setInputAction(action: ScreenSpaceEventAction, type: number, modifier?: number): void

      public getInputAction(type: number, modifier?: number): ScreenSpaceEventAction

      public removeInputAction(type: number, modifier?: number): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  type ScreenSpaceEventAction = (evt: PositionedEvent | MoveEvent | Touch2Event) => void

  class ShowGeometryInstanceAttribute {

      public static toValue(show: boolean, result?: Uint8Array): Uint8Array
      public value: Uint8Array
      public componentDatatype: ComponentDatatype
      public componentsPerAttribute: number
      public normalize: boolean

      constructor(show?: boolean);
  }

  class SimplePolylineGeometry {

      public static createGeometry(simplePolylineGeometry: SimplePolylineGeometry): Geometry | undefined

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: SimplePolylineGeometry): SimplePolylineGeometry
      public packedLength: number

      constructor(options: {
          positions: Cartesian3[];
          colors?: Color[];
          colorsPerVertex?: boolean;
          followSurface?: boolean;
          granularity?: number;
          ellipsoid?: Ellipsoid
      });
  }

  class SphereGeometry {
      public static packedLength: number

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: SphereGeometry): SphereGeometry

      public static createGeometry(sphereGeometry: SphereGeometry): Geometry | undefined

      constructor(options?: { radius?: number; stackPartitions?: number; slicePartitions?: number; vertexFormat?: VertexFormat });
  }

  class SphereOutlineGeometry {
      public static packedLength: number

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: SphereOutlineGeometry): SphereOutlineGeometry

      public static createGeometry(sphereGeometry: SphereOutlineGeometry): Geometry | undefined

      constructor(options?: { radius?: number; stackPartitions?: number; slicePartitions?: number; subdivisions?: number });
  }

  class Spherical {

      public static fromCartesian3(cartesian3: Cartesian3, spherical?: Spherical): Spherical

      public static clone(spherical: Spherical, result?: Spherical): Spherical

      public static normalize(spherical: Spherical, result?: Spherical): Spherical

      public static equals(left: Spherical, right: Spherical): boolean

      public static equalsEpsilon(left: Spherical, right: Spherical, epsilon?: number): boolean
      constructor(clock?: number, cone?: number, magnitude?: number);

      public equals(other: Spherical): boolean

      public clone(result?: Spherical): Spherical

      public equalsEpsilon(other: Spherical, epsilon: number): boolean

      public toString(): string
  }

  class Spline {
      public times: number[]
      public points: Cartesian3[] | Quaternion[]

      public evaluate(time: number, result?: Cartesian3 | Quaternion): Cartesian3 | Quaternion

      public findTimeInterval(time: number, startIndex: number): number
  }

  class TaskProcessor {
      constructor(workerName: string, maximumActiveTasks?: number);

      public scheduleTask(parameters: any, transferableObjects?: any[]): Promise<any>

      public isDestroyed(): boolean

      public destroy(): void
  }

  class TerrainData {
      public waterMask: Uint8Array | HTMLImageElement | HTMLCanvasElement

      public interpolateHeight(rectangle: Rectangle, longitude: number, latitude: number): number

      public isChildAvailable(thisX: number, thisY: number, childX: number, childY: number): boolean

      public createMesh(tilingScheme: TilingScheme, x: number, y: number, level: number): Promise<TerrainMesh>

      public upsample(tilingScheme: TilingScheme, thisX: number, thisY: number, thisLevel: number, descendantX: number, descendantY: number, descendantLevel: number): Promise<TerrainData>

      public wasCreatedByUpsampling(): boolean
  }

  class TerrainMesh {
      public center: Cartesian3
      public vertices: Float32Array
      public stride: number
      public indices: Uint16Array | Uint32Array
      public minimumHeight: number
      public maximumHeight: number
      public boundingSphere3D: BoundingSphere
      public occludeePointInScaledSpace: Cartesian3

      constructor(center: Cartesian3, vertices: Float32Array, indices: Uint16Array | Uint32Array, minimumHeight: number, maximumHeight: number, boundingSphere3D: BoundingSphere, occludeePointInScaledSpace: Cartesian3, vertexStride?: number);
  }

  class TerrainProvider {
      public static heightmapTerrainQuality: number

      public static getEstimatedLevelZeroGeometricErrorForAHeightmap(ellipsoid: Ellipsoid, tileImageWidth: number, numberOfTilesAtLevelZero: number): number

      public static getRegularGridIndices(width: number, height: number): Uint16Array
      public credit: Credit
      public errorEvent: Event
      public hasVertexNormals: boolean
      public hasWaterMask: boolean
      public ready: boolean
      public readonly readyPromise: Promise<boolean>
      public tilingScheme: TilingScheme

      public getLevelMaximumGeometricError(level: number): number

      public getTileDataAvailable(x: number, y: number, level: number): boolean

      public requestTileGeometry(x: number, y: number, level: number, request?: Request): Promise<TerrainData>
  }

  class TileProviderError {

      public static handleError(previousError: TileProviderError, provider: ImageryProvider | TerrainProvider, event: Event, message: string, x: number, y: number, level: number, retryFunction: TileProviderError.RetryFunction, errorDetails?: Error): TileProviderError

      public static handleSuccess(previousError: TileProviderError): void
      public provider: ImageryProvider | TerrainProvider
      public message: string
      public x: number
      public y: number
      public level: number
      public timesRetried: number
      public retry: boolean
      public error: Error

      constructor(provider: ImageryProvider | TerrainProvider, message: string, x?: number, y?: number, level?: number, timesRetried?: number, error?: Error);
  }

  namespace TileProviderError {
      type RetryFunction = () => void
  }

  class TilingScheme {
      public ellipsoid: Ellipsoid
      public rectangle: Rectangle
      public projection: MapProjection

      public getNumberOfXTilesAtLevel(level: number): number

      public getNumberOfYTilesAtLevel(level: number): number

      public rectangleToNativeRectangle(rectangle: Rectangle, result?: Rectangle): Rectangle

      public tileXYToNativeRectangle(x: number, y: number, level: number, result?: any): Rectangle

      public tileXYToRectangle(x: number, y: number, level: number, result?: any): Rectangle

      public positionToTileXY(position: Cartographic, level: number, result?: Cartesian2): Cartesian2
  }

  class TimeInterval {
      public static EMPTY: TimeInterval

      public static fromIso8601(options: { iso8601: string; isStartIncluded?: boolean; isStopIncluded?: boolean; data?: any }, result?: TimeInterval): TimeInterval

      public static toIso8601(timeInterval: TimeInterval, precision?: number): string

      public static clone(timeInterval?: TimeInterval, result?: TimeInterval): TimeInterval

      public static equals(left?: TimeInterval, right?: TimeInterval, dataComparer?: TimeInterval.DataComparer): boolean

      public static equalsEpsilon(left: TimeInterval, right: TimeInterval, epsilon: number, dataComparer?: TimeInterval.DataComparer): boolean

      public static intersect(left: TimeInterval, right: TimeInterval, result: TimeInterval, mergeCallback?: TimeInterval.MergeCallback): TimeInterval

      public static contains(timeInterval: TimeInterval, julianDate: JulianDate): boolean
      public start: JulianDate
      public stop: JulianDate
      public data: any
      public isStartIncluded: boolean
      public isStopIncluded: boolean
      public isEmpty: boolean

      constructor(options?: { start?: JulianDate; stop?: JulianDate; isStartIncluded?: boolean; isStopIncluded?: boolean; data?: any });

      public clone(result?: TimeInterval): TimeInterval

      public equals(right?: TimeInterval, dataComparer?: TimeInterval.DataComparer): boolean

      public equalsEpsilon(right: TimeInterval, epsilon: number, dataComparer?: TimeInterval.DataComparer): boolean

      public toString(): string
  }

  namespace TimeInterval {
      type MergeCallback = (leftData: any, rightData: any) => any
      type DataComparer = (leftData: any, rightData: any) => boolean
  }

  class TimeIntervalCollection {
      public changedEvent: Event
      public start: JulianDate
      public isStartIncluded: boolean
      public stop: JulianDate
      public isStopIncluded: boolean
      public length: number
      public isEmpty: boolean

      constructor(intervals?: TimeInterval[]);

      public equals(right?: TimeIntervalCollection, dataComparer?: TimeInterval.DataComparer): boolean

      public get(index: number): TimeInterval

      public removeAll(): void

      public findIntervalContainingDate(date: JulianDate): TimeInterval

      public findDataForIntervalContainingDate(date: JulianDate): Object

      public contains(julianDate: JulianDate): boolean

      public indexOf(date: JulianDate): number

      public findInterval(options?: { start?: JulianDate; stop?: JulianDate; isStartIncluded?: boolean; isStopIncluded?: boolean }): TimeInterval

      public addInterval(interval: TimeInterval, dataComparer?: TimeInterval.DataComparer): void

      public removeInterval(interval: TimeInterval): void

      public intersect(other: TimeIntervalCollection, dataComparer?: TimeInterval.DataComparer, mergeCallback?: TimeInterval.MergeCallback): TimeIntervalCollection
  }

  class GoogleEarthEnterpriseTerrainProvider extends TerrainProvider {
      public readonly credit: Credit
      public readonly errorEvent: Event
      public hasVertexNormals: boolean
      public hasWaterMask: boolean
      public readonly proxy: Proxy
      public readonly ready: boolean
      public readonly readyPromise: Promise<boolean>
      public readonly tilingScheme: TilingScheme
      public readonly url: string

      constructor(options: { url: Resource | string; metadata: GoogleEarthEnterpriseMetadata; ellipsoid?: Ellipsoid; credit?: Credit | string });

      public getLevelMaximumGeometricError(level: number): number

      public getTileDataAvailable(x: number, y: number, level: number): boolean

      public requestTileGeometry(x: number, y: number, level: number, request?: Request): Promise<TerrainData>
  }

  class GoogleEarthEnterpriseMetadata {
      constructor(resourceOrUrl: Resource | string);
  }

  class VRTheWorldTerrainProvider extends TerrainProvider {
      public credit: Credit
      public errorEvent: Event
      public hasVertexNormals: boolean
      public hasWaterMask: boolean
      public ready: boolean
      public readonly readyPromise: Promise<boolean>
      public tilingScheme: GeographicTilingScheme

      constructor(options: { url: string; proxy?: any; ellipsoid?: Ellipsoid; credit?: Credit | string });

      public getLevelMaximumGeometricError(level: number): number

      public getTileDataAvailable(x: number, y: number, level: number): boolean

      public requestTileGeometry(x: number, y: number, level: number, request?: Request): Promise<TerrainData>
  }

  class VertexFormat {
      public static POSITION_ONLY: VertexFormat
      public static POSITION_AND_NORMAL: VertexFormat
      public static POSITION_NORMAL_AND_ST: VertexFormat
      public static POSITION_AND_ST: VertexFormat
      public static POSITION_AND_COLOR: VertexFormat
      public static ALL: VertexFormat
      public static DEFAULT: VertexFormat
      public static packedLength: number

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: VertexFormat): VertexFormat

      public static clone(cartesian: VertexFormat, result?: VertexFormat): VertexFormat
      public position: boolean
      public normal: boolean
      public st: boolean
      public binormal: boolean
      public tangent: boolean
      public color: boolean

      constructor(options?: any);
  }

  class WallGeometry {

      public static createGeometry(wallGeometry: WallGeometry): Geometry | undefined

      public static fromConstantHeights(positions: Cartesian3[], maximumHeight?: number, minimumHeight?: number, ellipsoid?: Ellipsoid): WallGeometry

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: WallGeometry): WallGeometry
      public packedLength: number

      constructor(options: {
          positions: Cartesian3[];
          granularity?: number;
          maximumHeights?: number[];
          minimumHeights?: number[];
          ellipsoid?: Ellipsoid;
          vertexFormat?: VertexFormat
      });
  }

  class WallOutlineGeometry {

      public static pack(value: any, array: number[], startingIndex?: number): number[]

      public static unpack(array: number[], startingIndex?: number, result?: WallOutlineGeometry): WallOutlineGeometry

      public static fromConstantHeights(positions: Cartesian3[], maximumHeight?: number, minimumHeight?: number, ellipsoid?: Ellipsoid): WallOutlineGeometry

      public static createGeometry(wallGeometry: WallOutlineGeometry): Geometry | undefined
      public packedLength: number

      constructor(options: { positions: Cartesian3[]; granularity?: number; maximumHeights?: number[]; minimumHeights?: number[]; ellipsoid?: Ellipsoid });
  }

  class WebMercatorProjection {
      public static MaximumLatitude: number

      public static mercatorAngleToGeodeticLatitude(mercatorAngle: number): number

      public static geodeticLatitudeToMercatorAngle(latitude: number): number
      public ellipsoid: Ellipsoid

      constructor(ellipsoid?: Ellipsoid);

      public project(cartographic: Cartographic, result?: Cartesian3): Cartesian3

      public unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic
  }

  class WebMercatorTilingScheme {
      public ellipsoid: Ellipsoid
      public rectangle: Rectangle
      public projection: MapProjection

      constructor(options?: { ellipsoid?: Ellipsoid; numberOfLevelZeroTilesX?: number; numberOfLevelZeroTilesY?: number; rectangleSouthwestInMeters?: Cartesian2; rectangleNortheastInMeters?: Cartesian2 });

      public getNumberOfXTilesAtLevel(level: number): number

      public getNumberOfYTilesAtLevel(level: number): number

      public rectangleToNativeRectangle(rectangle: Rectangle, result?: Rectangle): Rectangle

      public tileXYToNativeRectangle(x: number, y: number, level: number, result?: any): Rectangle

      public tileXYToRectangle(x: number, y: number, level: number, result?: any): Rectangle

      public positionToTileXY(position: Cartographic, level: number, result?: Cartesian2): Cartesian2
  }

  interface BillboardGraphicsOptions {
      image?: any | String | HTMLCanvasElement
      show?: any | boolean
      scale?: any | number
      horizontalOrigin?: any | HorizontalOrigin
      verticalOrigin?: any | VerticalOrigin
      eyeOffset?: any
      pixelOffset?: any | Cartesian2
      rotation?: any
      alignedAxis?: any
      width?: any | number
      height?: any | number
      color?: any
      scaleByDistance?: any | NearFarScalar
      translucencyByDistance?: any | NearFarScalar
      pixelOffsetScaleByDistance?: any | NearFarScalar
      imageSubRegion?: any
  }

  class BillboardGraphics {
      public readonly definitionChanged: Event
      public disableDepthTestDistance: any | any
      public distanceDisplayCondition: any | any
      public heightReference: any | any
      public sizeInMeters: any | any
      public image: any | any
      public imageSubRegion: any | any
      public scale: any | any
      public rotation: any | any
      public alignedAxis: any | any
      public horizontalOrigin: any | any
      public verticalOrigin: any | any
      public color: any | any
      public eyeOffset: any | any
      public pixelOffset: any | any
      public show: any | any
      public width: any | any
      public height: any | any
      public scaleByDistance: any | any
      public translucencyByDistance: any | any
      public pixelOffsetScaleByDistance: any | any

      constructor(options?: BillboardGraphicsOptions);

      public clone(result?: BillboardGraphics): BillboardGraphics

      public merge(source: BillboardGraphics): void
  }

  class BillboardVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      public update(time: JulianDate): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class BoxGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class BoxGraphics {
      public definitionChanged: Event
      public show: any
      public dimensions: any
      public material: MaterialProperty
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any

      constructor(options?: { dimensions?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any });

      public clone(result?: BoxGraphics): BoxGraphics

      public merge(source: BoxGraphics): void
  }

  class CallbackProperty {
      public isConstant: boolean
      public definitionChanged: Event

      constructor(callback: CallbackProperty.Callback, isConstant: boolean);

      public getValue(time?: JulianDate, result?: any): any

      public setCallback(callback: CallbackProperty.Callback, isConstant: boolean): void

      public equals(other?: any): boolean
  }

  namespace CallbackProperty {
      type Callback = (time?: JulianDate, result?: any) => any
  }

  class CheckerboardMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public evenColor: any
      public oddColor: any
      public repeat: any

      constructor(options?: { evenColor?: any; oddColor?: any; repeat?: any });

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class ColorMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public color: any

      constructor(color?: any);

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class CompositeEntityCollection {
      public collectionChanged: Event
      public id: string
      public values: Entity[]

      constructor(collections?: EntityCollection[]);

      public addCollection(collection: EntityCollection, index?: number): void

      public removeCollection(collection: EntityCollection): boolean

      public removeAllCollections(): void

      public containsCollection(collection: EntityCollection): boolean

      public contains(entity: Entity): boolean

      public indexOfCollection(collection: EntityCollection): number

      public getCollection(index: number): EntityCollection

      public getCollectionsLength(): number

      public raiseCollection(collection: EntityCollection): void

      public lowerCollection(collection: EntityCollection): void

      public raiseCollectionToTop(collection: EntityCollection): void

      public lowerCollectionToBottom(collection: EntityCollection): void

      public suspendEvents(): void

      public resumeEvents(): void

      public computeAvailability(): TimeInterval

      public getById(id: any): Entity
  }

  class CompositeMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public intervals: TimeIntervalCollection

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class CompositePositionProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public intervals: TimeIntervalCollection
      public referenceFrame: ReferenceFrame

      public getValue(time: JulianDate, result?: any): any

      public getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3

      public equals(other?: any): boolean
  }

  class CompositeProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public intervals: TimeIntervalCollection

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class ConstantPositionProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public referenceFrame: ReferenceFrame

      constructor(value?: Cartesian3, referenceFrame?: ReferenceFrame);

      public getValue(time: JulianDate, result?: any): any

      public setValue(value: Cartesian3, referenceFrame?: ReferenceFrame): void

      public getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3

      public equals(other?: any): boolean
  }

  class ConstantProperty {
      public isConstant: boolean
      public definitionChanged: Event

      constructor(value?: any);

      public getValue(time?: JulianDate, result?: any): any

      public setValue(value: any): void

      public equals(other?: any): boolean
  }

  class CorridorGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class CorridorGraphics {
      public definitionChanged: Event
      public show: any
      public material: MaterialProperty
      public positions: any
      public height: any
      public extrudedHeight: any
      public granularity: any
      public width: any
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any
      public cornerType: any

      constructor(options?: { positions?: any; width?: any; cornerType?: any; height?: any; extrudedHeight?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; granularity?: any });

      public clone(result?: CorridorGraphics): CorridorGraphics

      public merge(source: CorridorGraphics): void
  }

  class CustomDataSource extends DataSource {
      public name: string
      public clock: DataSourceClock
      public entities: EntityCollection
      public isLoading: boolean
      public changedEvent: Event
      public errorEvent: Event
      public loadingEvent: Event

      constructor(name?: string);
  }

  class CylinderGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class CylinderGraphics {
      public definitionChanged: Event
      public length: any
      public topRadius: any
      public bottomRadius: any
      public numberOfVerticalLines: any
      public slices: any
      public show: any
      public material: MaterialProperty
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any

      constructor(options?: { length?: any; topRadius?: any; bottomRadius?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; numberOfVerticalLines?: any; slices?: any });

      public clone(result?: CylinderGraphics): CylinderGraphics

      public merge(source: CylinderGraphics): void
  }

  class CzmlDataSource extends DataSource {
      public static updaters: any[]
      public static load(data: string | any, options?: { sourceUri?: string }): Promise<CzmlDataSource>

      public static processPacketData(type: Function, object: any, propertyName: string, packetData: any, interval: TimeInterval, sourceUri: string, entityCollection: EntityCollection): void

      public static processPositionPacketData(object: any, propertyName: string, packetData: any, interval: TimeInterval, sourceUri: string, entityCollection: EntityCollection): void

      public static processMaterialPacketData(object: any, propertyName: string, packetData: any, interval: TimeInterval, sourceUri: string, entityCollection: EntityCollection): void
      public name: string
      public clock: DataSourceClock
      public entities: EntityCollection
      public isLoading: boolean
      public changedEvent: Event
      public errorEvent: Event
      public loadingEvent: Event

      constructor(name?: string);

      public process(data: string | any, options?: { sourceUri?: string }): Promise<CzmlDataSource>

      public load(data: string | any, options?: { sourceUri?: string }): Promise<CzmlDataSource>
  }

  class DataSource {
      public changedEvent: Event
      public clock: DataSourceClock
      public clustering: EntityCluster
      public entities: EntityCollection
      public errorEvent: Event
      public isLoading: boolean
      public loadingEvent: Event
      public name: string
      public show: boolean

      public update(time: JulianDate): boolean
  }

  class DataSourceClock {
      public definitionChanged: Event
      public startTime: JulianDate
      public stopTime: JulianDate
      public currentTime: JulianDate
      public clockRange: ClockRange
      public clockStep: ClockStep
      public multiplier: number

      public clone(result?: DataSourceClock): DataSourceClock

      public equals(other: DataSourceClock): boolean

      public merge(source: DataSourceClock): void

      public getValue(): Clock
  }

  class DataSourceCollection {
      public length: number
      public dataSourceAdded: Event
      public dataSourceRemoved: Event

      public add(dataSource: DataSource | Promise<DataSource>): Promise<DataSource>

      public remove(dataSource: DataSource, destroy?: boolean): boolean

      public removeAll(destroy?: boolean): void

      public contains(dataSource: DataSource): boolean

      public indexOf(dataSource: DataSource): number

      public get(index: number): DataSource

      public isDestroyed(): boolean

      public destroy(): void
  }

  class DataSourceDisplay {
      public static defaultVisualizersCallback: DataSourceDisplay.VisualizersCallback
      public scene: Scene
      public dataSources: DataSourceCollection
      public defaultDataSource: CustomDataSource

      constructor(options: { scene: Scene; dataSourceCollection: DataSourceCollection; visualizersCallback?: DataSourceDisplay.VisualizersCallback });

      public isDestroyed(): boolean

      public destroy(): void

      public update(time: JulianDate): boolean
  }

  namespace DataSourceDisplay {
      type VisualizersCallback = (scene: Scene, dataSource: DataSource) => Visualizer[]
  }

  class DynamicGeometryUpdater {
      public update(time: JulianDate): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class EllipseGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class EllipseGraphics {
      public definitionChanged: Event
      public semiMajorAxis: any
      public semiMinorAxis: any
      public rotation: any
      public show: any
      public material: MaterialProperty
      public height: any
      public extrudedHeight: any
      public granularity: any
      public stRotation: any
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any
      public numberOfVerticalLines: any

      constructor(options?: { semiMajorAxis?: number; semiMinorAxis?: number; height?: any; extrudedHeight?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; numberOfVerticalLines?: any; rotation?: any; stRotation?: any; granularity?: any });

      public clone(result?: EllipseGraphics): EllipseGraphics

      public merge(source: EllipseGraphics): void
  }

  class EllipsoidGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class EllipsoidGraphics {
      public definitionChanged: Event
      public show: any
      public radii: any
      public material: MaterialProperty
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any
      public stackPartitions: any
      public slicePartitions: any
      public subdivisions: any

      constructor(options?: { radii?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; subdivisions?: any; stackPartitions?: any; slicePartitions?: any });

      public clone(result?: EllipsoidGraphics): EllipsoidGraphics

      public merge(source: EllipsoidGraphics): void
  }

  class Entity {
      public availability: TimeIntervalCollection
      public id: string
      public definitionChanged: Event
      public name: string
      public show: boolean
      public isShowing: boolean
      public parent: Entity
      public propertyNames: Event
      public billboard: BillboardGraphics
      public box: BoxGraphics
      public corridor: CorridorGraphics
      public cylinder: CylinderGraphics
      public description: any | any
      public ellipse: EllipseGraphics
      public ellipsoid: EllipsoidGraphics
      public entityCollection: EntityCollection
      public label: LabelGraphics
      public model: ModelGraphics
      public orientation: any
      public path: PathGraphics
      public point: PointGraphics
      public polygon: PolygonGraphics
      public polyline: PolylineGraphics
      public polylineVolume: PolylineVolumeGraphics
      public position: PositionProperty
      public properties: PropertyBag
      public rectangle: RectangleGraphics
      public viewFrom: any
      public wall: WallGraphics

      constructor(options?: EntityOptions);

      public isAvailable(time: JulianDate): boolean

      public addProperty(propertyName: string): void

      public removeProperty(propertyName: string): void

      public merge(source: Entity): void
  }

  class EntityOptions {
      public id?: string
      public name?: string
      public show?: boolean
      public description?: any | string
      public position?: any | Cartesian3
      public orientation?: any | any
      public viewFrom?: any | any
      public parent?: Entity
      public billboard?: BillboardGraphics | BillboardGraphicsOptions
      public box?: BoxGraphics
      public corridor?: CorridorGraphics
      public cylinder?: CylinderGraphics
      public ellipse?: EllipseGraphics
      public ellipsoid?: EllipsoidGraphics
      public label?: LabelGraphics | LabelGraphicsOptions
      public model?: ModelGraphics
      public path?: PathGraphics
      public point?: PointGraphics
      public polygon?: PolygonGraphics | PolygonGraphicsOptions
      public polyline?: PolylineGraphics | PolylineGraphicsOptions
      public polylineVolume?: PolylineVolumeGraphics
      public properties?: { [key: string]: string | number | boolean }
      public rectangle?: RectangleGraphics
      public wall?: WallGraphics
  }

  class EntityCluster {

      public clusterBillboards: boolean
      public clusterEvent: Event
      public clusterLabels: boolean
      public clusterPoints: boolean
      public enabled: boolean
      public minimumClusterSize: number
      public pixelRange: number
      constructor(options: EntityClusterOptions);
  }

  interface EntityClusterOptions {
      clusterBillboards?: boolean
      clusterLabels?: boolean
      clusterPoints?: boolean
      enabled?: boolean
      minimumClusterSize?: number
      pixelRange?: number
  }

  namespace EntityCluster {
      type newClustterCallback = (clusteredEntities: Entity[], cluster: { billboard: BillboardGraphics, label: LabelGraphics, point: PointGraphics }) => void
  }

  class EntityCollection {
      public collectionChanged: Event
      public id: string
      public owner: DataSource | CompositeEntityCollection
      public show: boolean
      public values: Entity[]

      public suspendEvents(): void

      public resumeEvents(): void

      public computeAvailability(): TimeInterval

      public add(entity: Entity | EntityOptions): Entity

      public remove(entity: Entity): boolean

      public contains(entity: Entity): boolean

      public removeById(id: any): boolean

      public removeAll(): void

      public getById(id: any): Entity

      public getOrCreateEntity(id: any): Entity
  }

  namespace EntityCollection {
      type collectionChangedEventCallback = (collection: EntityCollection, added: Entity[], removed: Entity[], changed: Entity[]) => void
  }

  class EntityView {
      public static defaultOffset3D: Cartesian3
      public entity: Entity
      public scene: Scene
      public ellipsoid: Ellipsoid
      public boundingSphere: Entity

      constructor(entity: Entity, scene: Scene, ellipsoid?: Ellipsoid, boundingSphere?: BoundingSphere);

      public update(time: JulianDate): void
  }

  class GeoJsonDataSource extends DataSource {
      public static markerSize: number
      public static markerSymbol: string
      public static markerColor: Color
      public static stroke: Color
      public static strokeWidth: number
      public static fill: Color
      public static crsNames: any
      public static crsLinkHrefs: any
      public static crsLinkTypes: any
      public static load(data: string | any, options?: {
          sourceUri?: string;
          describe?: (properties: Object, nameProperty: string) => void;
          markerSize?: number;
          markerSymbol?: string;
          markerColor?: Color;
          stroke?: Color;
          strokeWidth?: number;
          fill?: Color;
          clampToGround?: boolean;
      }): Promise<GeoJsonDataSource>
      public name: string
      public clock: DataSourceClock
      public entities: EntityCollection
      public isLoading: boolean
      public changedEvent: Event
      public errorEvent: Event
      public loadingEvent: Event

      constructor(name?: string);

      public load(data: string | any, options?: {
          sourceUri?: string;
          markerSize?: number;
          markerSymbol?: string;
          markerColor?: Color;
          stroke?: Color;
          strokeWidth?: number;
          fill?: Color;
          clampToGround?: boolean;
      }): Promise<GeoJsonDataSource>
  }

  class GeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class GeometryVisualizer {
      constructor(type: GeometryUpdater, scene: Scene, entityCollection: EntityCollection);

      public update(time: JulianDate): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class GridMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public color: Color
      public cellAlpha: any
      public lineCount: any
      public lineThickness: any
      public lineOffset: any

      constructor(options?: { color?: any; cellAlpha?: any; lineCount?: any; lineThickness?: any; lineOffset?: any });

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class ImageMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public image: any
      public repeat: any

      constructor(options?: { image?: any; repeat?: any });

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class KmlDataSource extends DataSource {
      public static load(data: string | Document | Blob, options?: KmlConstructorOptions & KmlLoadOptions): Promise<KmlDataSource>
      public name: string
      public clock: DataSourceClock
      public entities: EntityCollection
      public isLoading: boolean
      public changedEvent: Event
      public errorEvent: Event
      public loadingEvent: Event

      constructor(options: KmlConstructorOptions);

      public load(data: string | Document | Blob, options?: KmlLoadOptions): Promise<KmlDataSource>
  }

  class KmlConstructorOptions {
      public camera: Camera
      public canvas: HTMLCanvasElement
      public proxy?: DefaultProxy
  }

  class KmlLoadOptions {
      public camera: Camera
      public canvas: HTMLCanvasElement
      public proxy?: DefaultProxy
      public sourceUri?: string
      public clampToGround?: boolean
      public query?: Object
  }

  class KmlFeatureData {
      public author: { name: string; uri: string; email: string }
      public link: { href: string; hreflang: string; rel: string; type: string; title: string; length: string }
      public address: string
      public phoneNumber: string
      public snippet: string
      public extendedData: string
  }

  class LabelGraphics {
      public readonly definitionChanged: Event
      public showBackground: any | boolean
      public distanceDisplayCondition: any | any
      public disableDepthTestDistance: any | any
      public text: any
      public font: any
      public style: any
      public fillColor: any
      public outlineColor: any
      public outlineWidth: any
      public horizontalOrigin: any
      public verticalOrigin: any
      public eyeOffset: any
      public pixelOffset: any
      public scale: any
      public show: any
      public translucencyByDistance: any
      public pixelOffsetScaleByDistance: any

      constructor(options?: LabelGraphicsOptions);

      public clone(result?: LabelGraphics): LabelGraphics

      public merge(source: LabelGraphics): void
  }

  class LabelGraphicsOptions {
      public text?: any | string
      public font?: any | string
      public style?: any
      public fillColor?: any | Color
      public backgroundColor?: any | Color
      public outlineColor?: any | Color
      public outlineWidth?: any | number
      public show?: any | boolean
      public showBackground?: any | boolean
      public scale?: any | NearFarScalar | any
      public scaleByDistance?: any | NearFarScalar
      public horizontalOrigin?: any | HorizontalOrigin
      public verticalOrigin?: any | VerticalOrigin
      public eyeOffset?: any | Cartesian2
      public pixelOffset?: any | Cartesian2
      public translucencyByDistance?: any | NearFarScalar
      public pixelOffsetScaleByDistance?: any | NearFarScalar
      public distanceDisplayCondition?: any | DistanceDisplayCondition
      public disableDepthTestDistance?: any | number
      public heightReference?: any | number
  }

  class LabelVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      public update(time: JulianDate): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class MaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event

      public equals(left: MaterialProperty, right: MaterialProperty): boolean

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any
  }

  class ModelGraphics {
      public readonly definitionChanged: Event
      public show: any | boolean
      public scale: any | number
      public minimumPixelSize: any | number
      public uri: any | string
      public maximumScale: any | number

      constructor(options?: { uri?: any | string; show?: any; scale?: any | number; minimumPixelSize?: any | number; maximumScale: any | number });

      public clone(result?: ModelGraphics): ModelGraphics

      public merge(source: ModelGraphics): void
  }

  class ModelVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      public update(time: JulianDate): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class PathGraphics {
      public definitionChanged: Event
      public show: any
      public material: MaterialProperty
      public width: any
      public resolution: any
      public leadTime: any
      public trailTime: any

      constructor(options?: { leadTime?: any; trailTime?: any; show?: any; width?: any; material?: MaterialProperty; resolution?: any });

      public clone(result?: PathGraphics): PathGraphics

      public merge(source: PathGraphics): void
  }

  class PathVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      public update(time: JulianDate): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class PointGraphics {
      public color: any
      public pixelSize: any
      public outlineColor: any
      public outlineWidth: any
      public show: any | boolean
      public scaleByDistance: any
      public translucencyByDistance: any
      public heightReference: any
      public distanceDisplayCondition: any

      constructor(options?: PointGraphicsOptions);

      public clone(result?: PointGraphics): PointGraphics

      public merge(source: PointGraphics): void
  }

  class PointGraphicsOptions {
      public color?: Color
      public pixelSize?: number
      public outlineColor?: Color
      public outlineWidth?: number
      public show?: any | boolean
      public scaleByDistance?: any | NearFarScalar
      public translucencyByDistance?: any | NearFarScalar
      public heightReference?: HeightReference
      public distanceDisplayCondition?: any | number
  }

  class PointVisualizer {
      constructor(scene: Scene, entityCollection: EntityCollection);

      public update(time: JulianDate): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class PolygonGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class PolygonGraphics {
      public definitionChanged: Event
      public show: any | boolean
      public material: MaterialProperty
      public positions: any
      public hierarchy: any
      public height: any
      public extrudedHeight: any
      public granularity: any
      public stRotation: any
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any
      public perPositionHeight: any

      constructor(options?: PolygonGraphicsOptions);

      public clone(result?: PolygonGraphics): PolygonGraphics

      public merge(source: PolygonGraphics): void
  }

  class PolygonGraphicsOptions {
      public hierarchy?: any | PolygonHierarchy | Cartesian3[]
      public height?: number
      public extrudedHeight?: any | number
      public show?: any | boolean
      public fill?: any | boolean
      public material?: MaterialProperty | Color
      public outline?: boolean
      public outlineColor?: any | Color
      public outlineWidth?: number
      public stRotation?: any | number
      public granularity?: any | number
      public perPositionHeight?: any | boolean
  }

  class PolylineArrowMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public color: any

      constructor(color?: any);

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class PolylineGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class PolylineGlowMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public color: any
      public glowPower: any

      constructor(options?: { color?: any; glowPower?: any });

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  interface PolylineGraphicsOptions {
      positions?: Cartesian3[]
      followSurface?: any
      width?: number
      show?: any
      clampToGround?: boolean
      material?: MaterialProperty
      granularity?: any
      arcType?: number
      depthFailMaterial?: any
  }

  class ArcType {
      public static GEODESIC: number
      public static NONE: number
      public static RHUMB: number
  }

  class PolylineGraphics {
      public definitionChanged: Event
      public show: any
      public material: MaterialProperty
      public positions: any
      public width: number
      public followSurface: any
      public granularity: any
      public clampToGround: boolean
      constructor(options?: PolylineGraphicsOptions);

      public clone(result?: PolylineGraphics): PolylineGraphics

      public merge(source: PolylineGraphics): void
  }

  class PolylineOutlineMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public color: any
      public outlineColor: any
      public outlineWidth: any

      constructor(options?: { color?: any; outlineColor?: any; outlineWidth?: any });

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class PolylineVolumeGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class PolylineVolumeGraphics {
      public definitionChanged: Event
      public show: any
      public material: MaterialProperty
      public positions: any
      public shape: any
      public granularity: any
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any
      public cornerType: any

      constructor(options?: { positions?: any; shape?: any; cornerType?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; granularity?: any });

      public clone(result?: PolylineVolumeGraphics): PolylineVolumeGraphics

      public merge(source: PolylineVolumeGraphics): void
  }

  interface PositionProperty {
      readonly isConstant: boolean
      readonly definitionChanged: Event
      referenceFrame: ReferenceFrame

      equals(other: any): boolean

      getValue(time: JulianDate, result?: Cartesian3): Cartesian3

      getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3
  }

  class PositionPropertyArray {
      public isConstant: boolean
      public definitionChanged: Event
      public referenceFrame: ReferenceFrame

      constructor(value?: any[]);

      public getValue(time?: JulianDate, result?: Cartesian3[]): Cartesian3[]

      public getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3

      public setValue(value: any[]): void

      public equals(other?: any): boolean
  }

  class Property {
      public isConstant: boolean
      public definitionChanged: Event

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class PropertyArray {
      public isConstant: boolean
      public definitionChanged: Event

      constructor(value?: any[]);

      public getValue(time?: JulianDate, result?: any[]): any[]

      public setValue(value: any[]): void

      public equals(other?: any): boolean
  }

  interface ObjectLike {
      [key: string]: any
  }

  type PropertyBag = ObjectLike & {
      definitionChanged: Event;
      isConstant: boolean;
      propertyNames: string[];
      constructor(value?: object, createPropertyCallback?: Function): PropertyBag;
      addProperty(propertyName: string, value?: any, createPropertyCallback?: Function): void;
      getValue(time: JulianDate, result?: Object): Object;
      hasProperty(propertyName: string): boolean;
      merge(source: Object, createPropertyCallback?: Function): void;
      removeProperty(propertyName: string): void;
  }

  class RectangleGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class RectangleGraphics {
      public definitionChanged: Event
      public show: any
      public coordinates: any
      public material: MaterialProperty
      public height: any
      public extrudedHeight: any
      public granularity: any
      public stRotation: any
      public rotation: any
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any
      public closeTop: any
      public closeBottom: any

      constructor(options?: { coordinates?: any; height?: any; extrudedHeight?: any; closeTop?: any; closeBottom?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; rotation?: any; stRotation?: any; granularity?: any });

      public clone(result?: RectangleGraphics): RectangleGraphics

      public merge(source: RectangleGraphics): void
  }

  class ReferenceProperty {

      public static fromString(targetCollection: Entity, referenceString: string): ReferenceProperty
      public isConstant: boolean
      public definitionChanged: Event
      public referenceFrame: ReferenceFrame
      public targetId: string
      public targetCollection: EntityCollection
      public targetPropertyNames: string[]
      public resolvedProperty: any

      constructor(targetCollection: EntityCollection, targetId: string, targetPropertyNames: string);

      public getValue(time: JulianDate, result?: any): any

      public getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3

      public getType(time: JulianDate): string

      public equals(other?: any): boolean
  }

  class SampledPositionProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public referenceFrame: ReferenceFrame
      public interpolationDegree: number
      public interpolationAlgorithm: InterpolationAlgorithm
      public numberOfDerivatives: boolean
      public forwardExtrapolationType: ExtrapolationType
      public forwardExtrapolationDuration: number
      public backwardExtrapolationType: ExtrapolationType
      public backwardExtrapolationDuration: number

      constructor(referenceFrame?: ReferenceFrame, numberOfDerivatives?: number);

      public getValue(time: JulianDate, result?: Cartesian3): Cartesian3

      public getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3

      public setInterpolationOptions(options?: { interpolationAlgorithm?: InterpolationAlgorithm; interpolationDegree?: number }): void

      public addSample(time: JulianDate, position: Cartesian3, derivatives?: Cartesian3[]): void

      public addSamples(times: JulianDate[], positions: Cartesian3[], derivatives?: any[][]): void

      public addSamplesPackedArray(packedSamples: number[], epoch?: JulianDate): void

      public equals(other?: any): boolean
  }

  class SampledProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public type: any
      public derivativeTypes: Packable[]
      public interpolationDegree: number
      public interpolationAlgorithm: InterpolationAlgorithm
      public forwardExtrapolationType: ExtrapolationType
      public forwardExtrapolationDuration: number
      public backwardExtrapolationType: ExtrapolationType
      public backwardExtrapolationDuration: number

      constructor(type: number | Packable, derivativeTypes?: Packable[]);

      public getValue(time: JulianDate, result?: any): any

      public setInterpolationOptions(options?: { interpolationAlgorithm?: InterpolationAlgorithm; interpolationDegree?: number }): void

      public addSample(time: JulianDate, value: Packable, derivatives?: Packable[]): void

      public addSamples(times: JulianDate[], values: Packable[], derivativeValues?: any[][]): void

      public addSamplesPackedArray(packedSamples: number[], epoch?: JulianDate): void

      public equals(other?: any): boolean
  }

  class StripeMaterialProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public orientation: any
      public evenColor: Color
      public oddColor: Color
      public offset: any
      public repeat: number

      constructor(options?: { evenColor?: any; oddColor?: any; repeat?: any; offset?: any; orientation?: any });

      public getType(time: JulianDate): string

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class TimeIntervalCollectionPositionProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public intervals: TimeIntervalCollection
      public referenceFrame: ReferenceFrame

      constructor(referenceFrame?: ReferenceFrame);

      public getValue(time: JulianDate, result?: any): any

      public getValueInReferenceFrame(time: JulianDate, referenceFrame: ReferenceFrame, result?: Cartesian3): Cartesian3

      public equals(other?: any): boolean
  }

  class TimeIntervalCollectionProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public intervals: TimeIntervalCollection

      public getValue(time: JulianDate, result?: any): any

      public equals(other?: any): boolean
  }

  class VelocityOrientationProperty {
      public isConstant: boolean
      public definitionChanged: Event
      public position: any
      public ellipsoid: any

      constructor(position?: any, ellipsoid?: Ellipsoid);

      public getValue(time?: JulianDate, result?: Quaternion): Quaternion

      public equals(other?: any): boolean
  }

  class Visualizer {
      public update(time: JulianDate): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class WallGeometryUpdater {
      public static perInstanceColorAppearanceType: Appearance
      public static materialAppearanceType: Appearance
      public entity: Entity
      public fillEnabled: boolean
      public hasConstantFill: boolean
      public fillMaterialProperty: MaterialProperty
      public outlineEnabled: boolean
      public hasConstantOutline: boolean
      public outlineColorProperty: any
      public outlineWidth: number
      public isDynamic: boolean
      public isClosed: boolean
      public geometryChanged: boolean

      constructor(entity: Entity, scene: Scene);

      public isOutlineVisible(time: JulianDate): boolean

      public isFilled(time: JulianDate): boolean

      public createFillGeometryInstance(time: JulianDate): GeometryInstance

      public createOutlineGeometryInstance(time: JulianDate): GeometryInstance

      public isDestroyed(): boolean

      public destroy(): void

      public createDynamicUpdater(primitives: PrimitiveCollection): DynamicGeometryUpdater
  }

  class WallGraphics {
      public definitionChanged: Event
      public show: any
      public material: MaterialProperty
      public positions: any
      public minimumHeights: any
      public maximumHeights: any
      public granularity: any
      public fill: any
      public outline: any
      public outlineColor: any
      public outlineWidth: any

      constructor(options?: { positions?: any; maximumHeights?: any; minimumHeights?: any; show?: any; fill?: any; material?: MaterialProperty; outline?: any; outlineColor?: any; outlineWidth?: any; granularity?: any });

      public clone(result?: WallGraphics): WallGraphics

      public merge(source: WallGraphics): void
  }

  class Appearance {
      public material: Material
      public translucent: boolean
      public vertexShaderSource: string
      public fragmentShaderSource: string
      public renderState: any
      public closed: boolean

      constructor(options?: { translucent?: boolean; closed?: boolean; material?: Material; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      public getFragmentShaderSource(): string

      public isTranslucent(): boolean

      public getRenderState(): any
  }

  class ArcGisMapServerImageryProvider extends ImageryProvider {
      public url: string
      public proxy: Proxy
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public rectangle: Rectangle
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public ready: boolean
      public credit: Credit
      public usingPrecachedTiles: boolean
      public hasAlphaChannel: boolean

      constructor(options: { url: string; tileDiscardPolicy?: TileDiscardPolicy; proxy?: Proxy; usePreCachedTilesIfAvailable?: boolean; enablePickFeatures?: boolean; rectangle?: Rectangle; tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; tileWidth?: number; tileHeight?: number; maximumLevel?: number }, layers?: string);

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class Billboard {
      public show: boolean
      public position: Cartesian3
      public pixelOffset: Cartesian2
      public scaleByDistance: NearFarScalar
      public translucencyByDistance: NearFarScalar
      public pixelOffsetScaleByDistance: NearFarScalar
      public eyeOffset: Cartesian3
      public horizontalOrigin: HorizontalOrigin
      public verticalOrigin: VerticalOrigin
      public scale: number
      public color: Color
      public rotation: number
      public alignedAxis: Cartesian3
      public width: number
      public height: number
      public id: any
      public image: string
      public ready: boolean

      public setImage(id: string, image: HTMLImageElement | HTMLCanvasElement | string | Billboard.CreateImageCallback): void

      public setImageSubRegion(id: string, subRegion: BoundingRectangle): void

      public computeScreenSpacePosition(scene: Scene, result?: Cartesian2): Cartesian2

      public equals(other: Billboard): boolean
  }

  namespace Billboard {
      type CreateImageCallback = (id: string) => HTMLImageElement | HTMLCanvasElement | Promise<HTMLImageElement | HTMLCanvasElement>
  }

  class BillboardCollection {
      public modelMatrix: Matrix4
      public debugShowBoundingVolume: boolean
      public length: number

      constructor(options?: { modelMatrix?: Matrix4; debugShowBoundingVolume?: boolean });

      public add(billboard?: any): Billboard

      public remove(billboard: Billboard): boolean

      public removeAll(): void

      public contains(billboard?: Billboard): boolean

      public get(index: number): Billboard

      public update(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class BingMapsImageryProvider extends ImageryProvider {

      public static tileXYToQuadKey(x: number, y: number, level: number): string

      public static quadKeyToTileXY(quadkey: string): { x: number, y: number, level: number }
      public defaultGamma: number
      public url: string
      public proxy: Proxy
      public key: string
      public mapStyle: BingMapsStyle
      public culture: string
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public rectangle: Rectangle
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public ready: boolean
      public credit: Credit
      public hasAlphaChannel: boolean

      constructor(options: { url: string; key?: string; tileProtocol?: string; mapStyle?: string; culture?: string; ellipsoid?: Ellipsoid; tileDiscardPolicy?: TileDiscardPolicy; proxy?: Proxy });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class BingMapsApi {
      public static defaultKey: string
  }

  class EasingFunction {
      public static BACK_IN: Function
      public static BACK_IN_OUT: Function
      public static BACK_OUT: Function
      public static BOUNCE_IN: Function
      public static BOUNCE_IN_OUT: Function
      public static BOUNCE_OUT: Function
      public static CIRCULAR_IN: Function
      public static CIRCULAR_IN_OUT: Function
      public static CIRCULAR_OUT: Function
      public static CUBIC_IN: Function
      public static CUBIC_IN_OUT: Function
      public static CUBIC_OUT: Function
      public static ELASTIC_IN: Function
      public static ELASTIC_IN_OUT: Function
      public static ELASTIC_OUT: Function
      public static EXPONENTIAL_IN: Function
      public static EXPONENTIAL_IN_OUT: Function
      public static EXPONENTIAL_OUT: Function
      public static LINEAR_NONE: Function
      public static QUADRACTIC_IN: Function
      public static QUADRACTIC_IN_OUT: Function
      public static QUADRACTIC_OUT: Function
      public static QUARTIC_IN: Function
      public static QUARTIC_IN_OUT: Function
      public static QUARTIC_OUT: Function
      public static QUINTIC_IN: Function
      public static QUINTIC_IN_OUT: Function
      public static QUINTIC_OUT: Function
      public static SINUSOIDAL_IN: Function
      public static SINUSOIDAL_IN_OUT: Function
      public static SINUSOIDAL_OUT: Function
  }

  class Camera {
      public static DEFAULT_OFFSET: HeadingPitchRange
      public static DEFAULT_VIEW_RECTANGLE: Rectangle
      public static DEFAULT_VIEW_FACTOR: number
      public position: Cartesian3
      public direction: Cartesian3
      public up: Cartesian3
      public right: Cartesian3
      public frustum: OrthographicFrustum
      public defaultMoveAmount: number
      public defaultLookAmount: number
      public defaultRotateAmount: number
      public defaultZoomAmount: number
      public constrainedAxis: Cartesian3
      public maximumTranslateFactor: number
      public maximumZoomFactor: number
      public readonly transform: Matrix4
      public readonly inverseTransform: Matrix4
      public readonly viewMatrix: Matrix4
      public readonly inverseViewMatrix: Matrix4
      public readonly positionCartographic: Cartographic
      public readonly positionWC: Cartesian3
      public readonly directionWC: Cartesian3
      public readonly upWC: Cartesian3
      public readonly rightWC: Cartesian3
      public readonly heading: number
      public readonly pitch: number
      public readonly roll: number
      public readonly moveStart: Event
      public readonly moveEnd: Event
      public readonly changed: Event
      public percentageChanged: number

      constructor(scene: Scene);

      public setView(options: { destination?: Cartesian3 | Rectangle, orientation?: Object, endTransform?: Matrix4 }): void

      public worldToCameraCoordinates(cartesian: Cartesian4, result?: Cartesian4): Cartesian4

      public worldToCameraCoordinatesPoint(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public worldToCameraCoordinatesVector(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public cameraToWorldCoordinates(cartesian: Cartesian4, result?: Cartesian4): Cartesian4

      public cameraToWorldCoordinatesPoint(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public cameraToWorldCoordinatesVector(cartesian: Cartesian3, result?: Cartesian3): Cartesian3

      public move(direction: Cartesian3, amount?: number): void

      public moveForward(amount?: number): void

      public moveBackward(amount?: number): void

      public moveUp(amount?: number): void

      public moveDown(amount?: number): void

      public moveRight(amount?: number): void

      public moveLeft(amount?: number): void

      public lookLeft(amount?: number): void

      public lookRight(amount?: number): void

      public lookUp(amount?: number): void

      public lookDown(amount?: number): void

      public look(axis: Cartesian3, angle?: number): void

      public twistLeft(amount?: number): void

      public twistRight(amount?: number): void

      public rotate(axis: Cartesian3, angle?: number): void

      public rotateDown(angle?: number): void

      public rotateUp(angle?: number): void

      public rotateRight(angle?: number): void

      public rotateLeft(angle?: number): void

      public zoomIn(amount?: number): void

      public zoomOut(amount?: number): void

      public getMagnitude(): number

      public lookAt(target: Cartesian3, offset: Cartesian3 | HeadingPitchRange): void

      public lookAtTransform(transform: Matrix4, offset: Cartesian3 | HeadingPitchRange): void

      public getRectangleCameraCoordinates(rectangle: Rectangle, result?: Cartesian3): Cartesian3

      public computeViewRectangle(ellipsoid?: Ellipsoid, result?: Rectangle): Rectangle | undefined

      public pickEllipsoid(windowPosition: Cartesian2, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3

      public getPickRay(windowPosition: Cartesian2, result?: Ray): any

      public flyTo(options: {
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
      }): void

      public viewBoundingSphere(boundingSphere: BoundingSphere, offset?: HeadingPitchRange): void

      public flyToBoundingSphere(boundingSphere: BoundingSphere, options?: {
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
      }): void

      public clone(): Camera

      public cancelFlight(): void

      public distanceToBoundingSphere(boundingSphere: BoundingSphere): number

      public flyHome(duration?: number): void

      public switchToOrthographicFrustum(): void

      public switchToPerspectiveFrustum(): void

  }

  class CameraEventAggregator {
      public currentMousePosition: Cartesian2
      public anyButtonDown: boolean

      constructor(element?: HTMLCanvasElement);

      public isMoving(type: CameraEventType, modifier?: KeyboardEventModifier): boolean

      public getMovement(type: CameraEventType, modifier?: KeyboardEventModifier): any

      public getLastMovement(type: CameraEventType, modifier?: KeyboardEventModifier): any

      public isButtonDown(type: CameraEventType, modifier?: KeyboardEventModifier): boolean

      public getStartMousePosition(type: CameraEventType, modifier?: KeyboardEventModifier): Cartesian2

      public getButtonPressTime(type: CameraEventType, modifier?: KeyboardEventModifier): Date

      public getButtonReleaseTime(type: CameraEventType, modifier?: KeyboardEventModifier): Date

      public reset(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class CreditDisplay {
      constructor(container: HTMLElement, delimiter?: string);

      public addCredit(credit: Credit): void

      public addDefaultCredit(credit: Credit): void

      public removeDefaultCredit(credit: Credit): void

      public beginFrame(credit: Credit): void

      public endFrame(credit: Credit): void

      public destroy(): void

      public isDestroyed(): boolean
  }

  class CullingVolume {
      public planes: Cartesian4[]

      constructor(planes: Cartesian4[]);

      public computeVisibility(boundingVolume: any): Intersect
  }

  class DebugAppearance {
      public material: Material
      public translucent: boolean
      public vertexShaderSource: string
      public fragmentShaderSource: string
      public renderState: any
      public closed: boolean
      public attributeName: string
      public glslDatatype: string

      constructor(options: { attributeName: string; glslDatatype?: string; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      public getFragmentShaderSource(): string

      public isTranslucent(): boolean

      public getRenderState(): any
  }

  class DebugModelMatrixPrimitive {
      public length: number
      public width: number
      public show: boolean
      public modelMatrix: Matrix4
      public id: any

      constructor(options?: { length?: number; width?: number; modelMatrix?: Matrix4; show?: boolean; id?: any });

      public isDestroyed(): boolean

      public destroy(): void
  }

  class DiscardMissingTileImagePolicy {
      constructor(options: { missingImageUrl: string; pixelsToCheck: Cartesian2[]; disableCheckIfAllPixelsAreTransparent?: boolean });

      public isReady(): boolean

      public shouldDiscardImage(image: HTMLImageElement): boolean
  }

  class EllipsoidPrimitive {
      public center: Cartesian3
      public radii: Cartesian3
      public modelMatrix: Matrix4
      public show: boolean
      public material: Material
      public id: any
      public debugShowBoundingVolume: boolean

      constructor(options?: { center?: Cartesian3; radii?: Cartesian3; modelMatrix?: Matrix4; show?: boolean; material?: Material; id?: any; debugShowBoundingVolume?: boolean });

      public update(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class EllipsoidSurfaceAppearance {
      public static VERTEX_FORMAT: VertexFormat
      public material: Material
      public translucent: boolean
      public vertexShaderSource: string
      public fragmentShaderSource: string
      public renderState: any
      public closed: boolean
      public vertexFormat: VertexFormat
      public flat: boolean
      public faceForward: boolean
      public aboveGround: boolean

      constructor(options?: { flat?: boolean; faceForward?: boolean; translucent?: boolean; aboveGround?: boolean; material?: Material; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      public getFragmentShaderSource(): void

      public isTranslucent(): boolean

      public getRenderState(): any
  }

  class FrameRateMonitor {
      public static defaultSettings: Object

      public static fromScene(scene: Scene): FrameRateMonitor
      public samplingWindow: number
      public quietPeriod: number
      public warmupPeriod: number
      public minimumFrameRateDuringWarmup: number
      public minimumFrameRateAfterWarmup: number
      public scene: Scene
      public lowFrameRate: Event
      public nominalFrameRate: Event
      public lastFramesPerSecond: number

      constructor(options?: { scene: Scene; samplingWindow?: number; quietPeriod?: number; warmupPeriod?: number; minimumFrameRateDuringWarmup?: number; minimumFrameRateAfterWarmup?: number });

      public pause(): void

      public unpause(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class GetFeatureInfoFormat {
      constructor(type: string, format?: string);
  }

  class Globe {
      public baseColor: Color
      public depthTestAgainstTerrain: boolean
      public ellipsoid: Ellipsoid
      public enableLighting: boolean
      public imageryLayers: ImageryLayerCollection
      public lightingFadeInDistance: number
      public lightingFadeOutDistance: number
      public maximumScreenSpaceError: number
      public oceanNormalMapUrl: string
      public shadows: ShadowMode
      public show: boolean
      public showWaterEffect: boolean
      public terrainProvider: TerrainProvider
      public readonly terrainProviderChanged: Event
      public tileCacheSize: number
      public tileLoadProgressEvent: Event
      public material: Material

      constructor(ellipsoid?: Ellipsoid);

      public pick(ray: Ray, scene: Scene, result?: Cartesian3): Cartesian3

      public getHeight(cartographic: Cartographic): number

      public isDestroyed(): boolean

      public destroy(): void
  }

  class GoogleEarthEnterpriseMapsProvider {

      public readonly channel: number
      public readonly credit: Credit
      public defaultGamma: number
      public readonly errorEvent: Event
      public readonly hasAlphaChannel: boolean
      public readonly maximumLevel: number
      public readonly minimumLevel: number
      public readonly path: string
      public readonly proxy: Proxy
      public readonly ready: boolean
      public readonly readyPromise: Promise<boolean>
      public readonly rectangle: Rectangle
      public readonly requestType: string
      public readonly tileDiscardPolicy: TileDiscardPolicy
      public readonly tileHeight: number
      public readonly tileWidth: number
      public readonly tilingScheme: TilingScheme
      public readonly url: string
      public readonly version: number
      constructor(options: { url: string; channel: number; path?: string; maximumLevel?: number; tileDiscardPolicy?: TileDiscardPolicy; ellipsoid?: Ellipsoid; proxy?: Proxy });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>
  }

  class GoogleEarthEnterpriseImageryProvider extends ImageryProvider {
      public defaultGamma: number
      public url: string
      public path: string
      public proxy: Proxy
      public channel: number
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public version: number
      public requestType: string
      public rectangle: Rectangle
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public ready: boolean
      public credit: Credit
      public hasAlphaChannel: boolean

      constructor(options: { url: string; proxy?: Proxy; ellipsoid?: Ellipsoid; tileDiscardPolicy?: TileDiscardPolicy; credit?: Credit | string; });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class GridImageryProvider extends ImageryProvider {
      public proxy: Proxy
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public rectangle: Rectangle
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public ready: boolean
      public credit: Credit
      public hasAlphaChannel: boolean

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

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class HeadingPitchRange {

      public static clone(hpr: HeadingPitchRange, result?: HeadingPitchRange): HeadingPitchRange

      constructor(heading?: number, pitch?: number, roll?: number);
  }


  class HeadingPitchRoll {

      public static clone(headingPitchRoll: HeadingPitchRoll, result?: HeadingPitchRoll): HeadingPitchRoll

      public static equals(left?: HeadingPitchRoll, right?: HeadingPitchRoll): boolean

      public static equalsEpsilon(left?: HeadingPitchRoll, right?: HeadingPitchRoll, relativeEpsilon?: number, absoluteEpsilon?: number): boolean

      public static fromDegrees(heading: number, pitch: number, roll: number, result?: HeadingPitchRoll): HeadingPitchRoll

      public static fromQuaternion(quaternion: Quaternion, result?: HeadingPitchRoll): HeadingPitchRoll
      public heading: number
      public pitch: number
      public roll: number

      constructor(heading?: number, pitch?: number, range?: number);

      public toString(): string

      public clone(result?: HeadingPitchRoll): HeadingPitchRoll

      public equals(right?: HeadingPitchRoll): boolean

      public equalsEpsilon(right?: HeadingPitchRoll, relativeEpsilon?: number, absoluteEpsilon?: number): boolean
  }

  class ImageryLayer {
      public static DEFAULT_BRIGHTNESS: number
      public static DEFAULT_CONTRAST: number
      public static DEFAULT_GAMMA: number
      public static DEFAULT_HUE: number
      public static DEFAULT_MAGNIFICATION_FILTER: number
      public static DEFAULT_MINIFICATION_FILTER: number
      public static DEFAULT_SATURATION: number
      public static DEFAULT_SPLIT: number
      public alpha: number
      public brightness: number
      public contrast: number
      public gamma: number
      public hue: number
      public readonly imageryProvider: ImageryProvider
      public magnificationFilter: number
      public minificationFilter: number
      public readonly rectangle: Rectangle
      public saturation: number
      public show: boolean
      public splitDirection: number

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

      public getViewableRectangle(): Promise<Rectangle>

      public isBaseLayer(): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class TextureMagnificationFilter {
      public static LINEAR: number
      public static NEAREST: number
  }

  class ImagerySplitDirection {
      public static LEFT: number
      public static NONE: number
      public static RIGHT: number
  }

  class ImageryLayerCollection {
      public layerAdded: Event
      public layerRemoved: Event
      public layerMoved: Event
      public layerShownOrHidden: Event
      public length: number

      public add(layer: ImageryLayer, index?: number): void

      public addImageryProvider(imageryProvider: ImageryProvider, index?: number): ImageryLayer

      public remove(layer: ImageryLayer, destroy?: boolean): boolean

      public removeAll(destroy?: boolean): void

      public contains(layer: ImageryLayer): boolean

      public indexOf(layer: ImageryLayer): number

      public get(index: number): ImageryLayer

      public raise(layer: ImageryLayer): void

      public lower(layer: ImageryLayer): void

      public raiseToTop(layer: ImageryLayer): void

      public lowerToBottom(layer: ImageryLayer): void

      public pickImageryLayerFeatures(ray: Ray, scene: Scene): Promise<ImageryLayerFeatureInfo[]>

      public isDestroyed(): boolean

      public destroy(): void
  }

  class ImageryLayerFeatureInfo {
      public name: string
      public description: string
      public position: Cartographic
      public data: any

      public configureNameFromProperties(properties: any): void

      public configureDescriptionFromProperties(properties: any): void
  }

  class ImageryProvider {

      public static loadImage(url: string): Promise<HTMLImageElement | HTMLCanvasElement>
      public defaultAlpha: number
      public defaultBrightness: number
      public defaultContrast: number
      public defaultHue: number
      public defaultSaturation: number
      public defaultGamma: number
      public ready: boolean
      public rectangle: Rectangle
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public credit: Credit
      public proxy: Proxy
      public hasAlphaChannel: boolean

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class Label {
      public show: boolean
      public position: Cartesian3
      public text: string
      public font: string
      public fillColor: Color
      public outlineColor: Color
      public outlineWidth: number
      public style: LabelStyle
      public pixelOffset: Cartesian2
      public translucencyByDistance: NearFarScalar
      public pixelOffsetScaleByDistance: NearFarScalar
      public eyeOffset: Cartesian3
      public horizontalOrigin: HorizontalOrigin
      public verticalOrigin: VerticalOrigin
      public scale: number
      public id: any

      public computeScreenSpacePosition(scene: Scene, result?: Cartesian2): Cartesian2

      public equals(other: Label): boolean

      public isDestroyed(): boolean
  }

  class LabelCollection {
      public modelMatrix: Matrix4
      public debugShowBoundingVolume: boolean
      public length: number

      constructor(options?: { modelMatrix?: Matrix4; debugShowBoundingVolume?: boolean });

      public add(options?: any): Label

      public remove(label: Label): boolean

      public removeAll(): void

      public contains(label: Label): boolean

      public get(index: number): Label

      public isDestroyed(): boolean

      public destroy(): void
  }

  class Material {
      public static DefaultImageId: string
      public static DefaultCubeMapId: string
      public static ColorType: string
      public static ImageType: string
      public static DiffuseMapType: string
      public static AlphaMapType: string
      public static SpecularMapType: string
      public static EmissionMapType: string
      public static BumpMapType: string
      public static NormalMapType: string
      public static GridType: string
      public static StripeType: string
      public static CheckerboardType: string
      public static DotType: string
      public static WaterType: string
      public static RimLightingType: string
      public static FadeType: string
      public static PolylineArrowType: string
      public static PolylineGlowType: string
      public static PolylineOutlineType: string

      public static fromType(type: string, uniforms?: any): Material
      public type: string
      public shaderSource: string
      public materials: any
      public uniforms: any
      public translucent: boolean | Function

      constructor(options?: { strict?: boolean; translucent?: boolean | Function; fabric: any });

      public isTranslucent(): boolean

      public isDestroyed(): boolean

      public destroy(): void
  }

  class MaterialAppearance {
      public material: Material
      public translucent: boolean
      public vertexShaderSource: string
      public fragmentShaderSource: string
      public renderState: any
      public closed: boolean
      public materialSupport: MaterialAppearance.MaterialSupport
      public vertexFormat: VertexFormat
      public flat: boolean
      public faceForward: boolean

      constructor(options?: { flat?: boolean; faceForward?: boolean; translucent?: boolean; closed?: boolean; materialSupport?: MaterialAppearance.MaterialSupport; material?: Material; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      public getFragmentShaderSource(): string

      public isTranslucent(): boolean

      public getRenderState(): any
  }

  namespace MaterialAppearance {
      class MaterialSupport {
          public static BASIC: number
          public static TEXTURED: number
          public static ALL: number
      }
  }

  class Model {

      public static fromGltf(options?: {
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
      }): Model

      public static silhouetteSupported(scene: Scene): boolean
      public activeAnimations: ModelAnimationCollection
      public readonly allowPicking: boolean
      public readonly readonlyasynchronous: boolean
      public readonly basePath: string
      public readonly boundingSphere: BoundingSphere
      public clampAnimations: boolean
      public color: Color
      public colorBlendAmount: number
      public colorBlendMode: ColorBlendMode
      public debugShowBoundingVolume: boolean
      public debugWireframe: boolean
      public readonly gltf: any
      public id: any
      public readonly incrementallyLoadTextures: boolean
      public maximumScale: number
      public minimumPixelSize: number
      public modelMatrix: Matrix4
      public readonly pendingTextureLoads: number
      public readonly ready: boolean
      public readonly readyPromise: Promise<Model>
      public scale: number
      public shadows: ShadowMode
      public show: boolean
      public silhouetteColor: Color
      public silhouetteSize: number

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

      public getMesh(name: string): ModelMesh

      public getNode(name: string): ModelNode

      public getMaterial(name: string): ModelMaterial

      public update(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class ColorBlendMode { }

  class ModelAnimation {
      public removeOnStop: boolean
      public start: Event
      public update: Event
      public stop: Event
      public name: string
      public startTime: JulianDate
      public delay: number
      public stopTime: JulianDate
      public speedup: number
      public reverse: boolean
      public loop: ModelAnimationLoop
  }

  class ModelAnimationCollection {
      public animationAdded: Event
      public animationRemoved: Event
      public readonly length: number

      public add(options: {
          name: string;
          index?: number;
          startTime?: JulianDate;
          delay?: number;
          stopTime?: JulianDate;
          removeOnStop?: boolean;
          speedup?: number;
          reverse?: boolean;
          loop?: ModelAnimationLoop;
      }): ModelAnimation

      public addAll(options?: {
          startTime?: JulianDate;
          delay?: number;
          stopTime?: JulianDate;
          removeOnStop?: boolean;
          speedup?: number;
          reverse?: boolean;
          loop?: ModelAnimationLoop;
      }): ModelAnimation[]

      public contains(animation: ModelAnimation): boolean

      public get(index: number): ModelAnimation

      public remove(animation: ModelAnimation): boolean

      public removeAll(): void
  }

  class ModelMaterial {
      public name: string
      public id: string

      public setValue(name: string, value?: any): void

      public getValue(name: string): any
  }

  class ModelMesh {
      public name: string
      public id: string
      public materials: ModelMaterial[]
  }

  class ModelNode {
      public name: string
      public id: string
      public show: boolean
      public matrix: Matrix4
  }

  class Moon {
      public show: boolean
      public textureUrl: string
      public onlySunLighting: boolean
      public ellipsoid: Ellipsoid

      constructor(options?: { show?: boolean; textureUrl?: string; ellipsoid?: Ellipsoid; onlySunLighting?: boolean });

      public isDestroyed(): boolean

      public destroy(): void
  }

  class NeverTileDiscardPolicy {
      public isReady(): boolean

      public shouldDiscardImage(image: HTMLImageElement | Promise<HTMLImageElement>): Promise<boolean>
  }

  class OpenStreetMapImageryProvider {
      public url: string
      public proxy: Proxy
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public rectangle: Rectangle
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public ready: boolean
      public credit: Credit
      public hasAlphaChannel: boolean

      constructor(options?: { url?: string; fileExtension?: string; proxy?: any; rectangle?: Rectangle; minimumLevel?: number; maximumLevel?: number; ellipsoid?: Ellipsoid; credit?: Credit | string });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class OrthographicFrustum {
      public left: number
      public right: number
      public top: number
      public bottom: number
      public near: number
      public far: number
      public projectionMatrix: Matrix4

      public computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume

      public getPixelSize(drawingBufferDimensions: Cartesian2, distance?: number, result?: Cartesian2): Cartesian2

      public clone(result?: OrthographicFrustum): OrthographicFrustum

      public equals(other?: OrthographicFrustum): boolean
  }

  class PerInstanceColorAppearance {
      public static VERTEX_FORMAT: VertexFormat
      public static FLAT_VERTEX_FORMAT: VertexFormat
      public material: Material
      public translucent: boolean
      public vertexShaderSource: string
      public fragmentShaderSource: string
      public renderState: any
      public closed: boolean
      public vertexFormat: VertexFormat
      public flat: boolean
      public faceForward: boolean

      constructor(options?: { flat?: boolean; faceForward?: boolean; translucent?: boolean; closed?: boolean; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      public getFragmentShaderSource(): void

      public isTranslucent(): boolean

      public getRenderState(): any
  }

  class PerspectiveFrustum {
      public fov: number
      public aspectRatio: number
      public near: number
      public far: number
      public projectionMatrix: Matrix4
      public infiniteProjectionMatrix: Matrix4
      public fovy: number

      public computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume

      public getPixelSize(drawingBufferDimensions: Cartesian2, distance?: number, result?: Cartesian2): Cartesian2

      public clone(result?: PerspectiveFrustum): PerspectiveFrustum

      public equals(other?: PerspectiveFrustum): boolean
  }

  class PerspectiveOffCenterFrustum {
      public left: number
      public right: number
      public top: number
      public bottom: number
      public near: number
      public far: number
      public projectionMatrix: Matrix4
      public infiniteProjectionMatrix: Matrix4

      public computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume

      public getPixelSize(drawingBufferDimensions: Cartesian2, distance?: number, result?: Cartesian2): Cartesian2

      public clone(result?: PerspectiveOffCenterFrustum): PerspectiveOffCenterFrustum

      public equals(other?: PerspectiveOffCenterFrustum): boolean
  }

  class PointPrimitive {
      public show: boolean
      public position: Cartesian3
      public scaleByDistance: NearFarScalar
      public translucencyByDistance: NearFarScalar
      public pixelSize: number
      public color: Color
      public outlineColor: Color
      public outlineWidth: number
      public id: any

      public computeScreenSpacePosition(scene: Scene, result?: Cartesian2): Cartesian2

      public equals(other: PointPrimitive): boolean
  }

  class PointPrimitiveCollection {
      public modelMatrix: Matrix4
      public debugShowBoundingVolume: boolean
      public length: number

      constructor(options?: {
          modelMatrix?: Matrix4;
          debugShowBoundingVolume?: boolean;
          blendOption?: BlendOption;
      });

      public add(pointPrimitive?: any): PointPrimitive

      public remove(pointPrimitive: PointPrimitive): boolean

      public removeAll(): void

      public contains(pointPrimitive?: PointPrimitive): boolean

      public get(index: number): PointPrimitive

      public isDestroyed(): boolean

      public destroy(): void
  }

  class BlendOption {
      public static OPAQUE: number
      public static OPAQUE_AND_TRANSLUCENT: number
      public static TRANSLUCENT: number
  }

  class Polygon {
      public ellipsoid: Ellipsoid
      public granularity: number
      public height: number
      public textureRotationAngle: number
      public show: boolean
      public material: Material
      public id: any
      public asynchronous: boolean
      public debugShowBoundingVolume: boolean
      public positions: Cartesian3[]

      constructor(options?: { ellipsoid?: Ellipsoid; positions?: Cartesian3[]; polygonHierarchy?: any; granularity?: number; height?: number; textureRotationAngle?: number; show?: boolean; material?: Material; id?: any; asynchronous?: boolean; debugShowBoundingVolume?: boolean });

      public configureFromPolygonHierarchy(hierarchy: any): void

      public update(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class Polyline {
      public show: boolean
      public positions: Cartesian3[]
      public material: Material
      public width: number
      public loop: boolean
      public id: any

      constructor(options?: { show?: boolean; width?: number; loop?: boolean; material?: Material; positions?: Cartesian3[]; id?: any });
  }

  class PolylineCollection {
      public modelMatrix: Matrix4
      public debugShowBoundingVolume: boolean
      public length: number

      constructor(options?: { modelMatrix?: Matrix4; debugShowBoundingVolume?: boolean });

      public add(polyline?: any): Polyline

      public remove(polyline: Polyline): boolean

      public removeAll(): void

      public contains(polyline: Polyline): boolean

      public get(index: number): Polyline

      public isDestroyed(): boolean

      public destroy(): void
  }

  class PolylineColorAppearance {
      public static VERTEX_FORMAT: VertexFormat
      public material: Material
      public translucent: boolean
      public vertexShaderSource: string
      public fragmentShaderSource: string
      public renderState: any
      public closed: boolean
      public vertexFormat: VertexFormat

      constructor(options?: { translucent?: boolean; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      public getFragmentShaderSource(): void

      public isTranslucent(): boolean

      public getRenderState(): any
  }

  class PolylineMaterialAppearance {
      public static VERTEX_FORMAT: VertexFormat
      public material: Material
      public translucent: boolean
      public vertexShaderSource: string
      public fragmentShaderSource: string
      public renderState: any
      public closed: boolean
      public vertexFormat: VertexFormat

      constructor(options?: { translucent?: boolean; material?: Material; vertexShaderSource?: string; fragmentShaderSource?: string; renderState?: RenderState });

      public getFragmentShaderSource(): void

      public isTranslucent(): boolean

      public getRenderState(): any
  }

  class Primitive {
      public readonly allowPicking: boolean
      public readonly asynchronous: boolean
      public readonly compressVertices: boolean
      public readonly geometryInstances: GeometryInstance[] | GeometryInstance
      public readonly interleave: boolean
      public readonly vertexCacheOptimize: boolean
      public readonly releaseGeometryInstances: boolean
      public readonly ready: boolean
      public readonly readyPromise: Promise<Primitive>
      public cull: boolean
      public debugShowBoundingVolume: boolean
      public depthFailAppearance: Appearance
      public modelMatrix: Matrix4
      public shadows: ShadowMode
      public show: boolean
      public appearance: Appearance | any

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

      public update(): void

      public getGeometryInstanceAttributes(id: any): any

      public isDestroyed(): boolean

      public destroy(): void
  }

  class PrimitiveCollection {
      public readonly length: number
      public show: boolean
      public destroyPrimitives: boolean

      constructor(options?: { show?: boolean; destroyPrimitives?: boolean });

      public add(primitive: any): any

      public remove(primitive?: any): boolean

      public removeAll(): void

      public contains(primitive?: any): boolean

      public raise(primitive?: any): void

      public raiseToTop(primitive?: any): void

      public lower(primitive?: any): void

      public lowerToBottom(primitive?: any): void

      public get(index: number): any

      public isDestroyed(): boolean

      public destroy(): void
  }

  class GroundPrimitive {
      public static isSupported: any

      public static initializeTerrainHeights(): Promise<any>
      public readonly allowPicking: boolean
      public readonly asynchronous: boolean
      public readonly compressVertices: boolean
      public readonly geometryInstances: any[] | GeometryInstance
      public readonly interleave: boolean
      public readonly vertexCacheOptimize: boolean
      public readonly releaseGeometryInstances: boolean
      public readonly ready: boolean
      public readonly readyPromise: Promise<Primitive>
      public classificationType: any
      public debugShowBoundingVolume: boolean
      public debugShowShadowVolume: boolean
      public show: boolean

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

      public destroy(): void

      public getGeometryInstanceAttributes(id: any): any

      public destroy(): boolean

      public update(): void
  }

  class RectanglePrimitive {
      public ellipsoid: Ellipsoid
      public rectangle: Rectangle
      public granularity: number
      public height: number
      public rotation: number
      public textureRotationAngle: number
      public show: boolean
      public material: Material
      public id: any
      public asynchronous: boolean
      public debugShowBoundingVolume: boolean

      constructor(options?: { ellipsoid?: Ellipsoid; rectangle?: Rectangle; granularity?: number; height?: number; rotation?: number; textureRotationAngle?: number; show?: boolean; material?: Material; id?: any; asynchronous?: boolean; debugShowBoundingVolume?: boolean });

      public update(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class Fog {
      public density: number
      public enabled: boolean
      public screenSpaceErrorFactor: number
  }

  class MapMode2D {
      public static INFINITE_SCROLL: number
      public static ROTATE: number
  }

  class Scene {
      public backgroundColor: Color
      public readonly camera: Camera
      public readonly canvas: HTMLCanvasElement
      public completeMorphOnUserInput: boolean
      public debugCommandFilter: Function
      public readonly debugFrustumStatistics: any
      public debugShowCommands: boolean
      public debugShowFramesPerSecond: boolean
      public debugShowFrustumPlanes: boolean
      public debugShowFrustums: boolean
      public debugShowGlobeDepth: boolean
      public readonly drawingBufferHeight: number
      public readonly drawingBufferWidth: number
      public eyeSeparation: number
      public farToNearRatio: number
      public focalLength: number
      public fog: Fog
      public fxaa: boolean
      public globe: Globe
      public readonly groundPrimitives: PrimitiveCollection
      public readonly id: string
      public readonly imageryLayers: ImageryLayerCollection
      public imagerySplitPosition: number
      public invertClassification: boolean
      public invertClassificationColor: Color
      public mapMode2D: boolean
      public readonly mapProjection: MapProjection
      public readonly maximumAliasedLineWidth: number
      public readonly maximumCubeMapSize: number
      public minimumDisableDepthTestDistance: number
      public mode: SceneMode
      public moon: Moon
      public morphComplete: Event
      public morphStart: Event
      public morphTime: number
      public nearToFarDistance2D: number
      public readonly orderIndependentTranslucency: boolean
      public readonly pickPositionSupported: boolean
      public pickTranslucentDepth: boolean
      public readonly postRender: Event
      public readonly preRender: Event
      public readonly primitives: PrimitiveCollection
      public readonly renderError: Event
      public rethrowRenderErrors: boolean
      public readonly scene3DOnly: boolean
      public readonly screenSpaceCameraController: ScreenSpaceCameraController
      public shadowMap: ShadowMap
      public skyAtmosphere: SkyAtmosphere
      public skyBox: SkyBox
      public sun: Sun
      public sunBloom: boolean
      public terrainExaggeration: number
      public terrainProvider: TerrainProvider
      public readonly terrainProviderChanged: Event
      public useDepthPicking: boolean
      public useWebVR: boolean

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

      public cartesianToCanvasCoordinates(position: Cartesian3, result?: Cartesian2): Cartesian2

      public completeMorph(): void

      public destroy(): void

      public drillPick(windowPosition: Cartesian2, limit?: number): any[]

      public getCompressedTextureFormatSupported(format: string): boolean

      public isDestroyed(): boolean

      public morphTo2D(duration?: number): void

      public morphTo3D(duration?: number): void

      public morphToColumbusView(duration?: number): void

      public pick(windowPosition: Cartesian2, width?: number, height?: number): any

      public pickPosition(windowPosition: Cartesian2, result?: Cartesian3): Cartesian3

      public requestRender(): void
  }

  class ScreenSpaceCameraController {
      public enableInputs: boolean
      public enableTranslate: boolean
      public enableZoom: boolean
      public enableRotate: boolean
      public enableTilt: boolean
      public enableLook: boolean
      public inertiaSpin: number
      public inertiaTranslate: number
      public inertiaZoom: number
      public maximumMovementRatio: number
      public bounceAnimationTime: number
      public minimumZoomDistance: number
      public maximumZoomDistance: number
      public translateEventTypes: CameraEventType | any[]
      public zoomEventTypes: CameraEventType | any[]
      public rotateEventTypes: CameraEventType | any[]
      public tiltEventTypes: CameraEventType | any[]
      public lookEventTypes: CameraEventType | any[]
      public minimumPickingTerrainHeight: number
      public minimumCollisionTerrainHeight: number
      public minimumTrackBallHeight: number
      public enableCollisionDetection: boolean

      constructor(scene: Scene);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class ShadowMap {
      public darkness: number
      public enabled: boolean
      public maximumDistance: number
      public normalOffset: boolean
      public size: number
      public softShadows: boolean

      constructor(options: ShadowMapOptions);
  }

  interface ShadowMapOptions {
      lightCamera: Camera
      cascadesEnabled?: boolean
      darkness?: number
      enabled?: boolean
      isPointLight?: boolean
      maximumDistance?: number
      normalOffset?: boolean
      numberOfCascades?: number
      pointLightRadius?: number
      size?: number
      softShadows?: boolean
  }

  class SingleTileImageryProvider extends ImageryProvider {
      public url: string
      public proxy: Proxy
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public rectangle: Rectangle
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public ready: boolean
      public credit: Credit
      public hasAlphaChannel: boolean

      constructor(options: { url: string; rectangle?: Rectangle; credit?: Credit | string; ellipsoid?: Ellipsoid; proxy?: any });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class SkyAtmosphere {
      public brightnessShift: number
      public hueShift: number
      public saturationShift: number
      public show: boolean
      public readonly ellipsoid: Ellipsoid

      constructor(ellipsoid?: Ellipsoid);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class SkyBox {
      public sources: any
      public show: boolean

      constructor(options: { sources?: any; show?: boolean });

      public update(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class Sun {
      public show: boolean
      public glowFactor: number

      public isDestroyed(): boolean

      public destroy(): void
  }

  class TileCoordinatesImageryProvider {
      public proxy: Proxy
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public rectangle: Rectangle
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public ready: boolean
      public credit: Credit
      public hasAlphaChannel: boolean

      constructor(options?: { tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; color?: Color; tileWidth?: number; tileHeight?: number });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class TileDiscardPolicy {
      public isReady(): boolean

      public shouldDiscardImage(image: HTMLImageElement | Promise<HTMLImageElement>): Promise<boolean>
  }

  class TileMapServiceImageryProvider extends ImageryProvider {
      public readonly url: string
      public readonly proxy: Proxy
      public readonly tileWidth: number
      public readonly tileHeight: number
      public readonly maximumLevel: number
      public readonly minimumLevel: number
      public readonly tilingScheme: TilingScheme
      public readonly rectangle: Rectangle
      public readonly tileDiscardPolicy: TileDiscardPolicy
      public readonly errorEvent: Event
      public readonly ready: boolean
      public readonly readyPromise: Promise<boolean>
      public readonly credit: Credit
      public readonly hasAlphaChannel: boolean

      constructor(options?: { url?: string; fileExtension?: string; proxy?: any; credit?: Credit | string; minimumLevel?: number; maximumLevel?: number; rectangle?: Rectangle; tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; tileWidth?: number; tileHeight?: number });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class ViewportQuad {
      public show: boolean
      public rectangle: BoundingRectangle
      public material: Material

      constructor(rectangle?: BoundingRectangle, material?: Material);

      public update(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class WebMapServiceImageryProvider extends ImageryProvider {
      public static DefaultParameters: Object
      public static GetFeatureInfoDefaultParameters: Object
      public url: string
      public proxy: Proxy
      public layers: string
      public tileWidth: number
      public tileHeight: number
      public maximumLevel: number
      public minimumLevel: number
      public tilingScheme: TilingScheme
      public rectangle: Rectangle
      public tileDiscardPolicy: TileDiscardPolicy
      public errorEvent: Event
      public ready: boolean
      public readyPromise: Promise<boolean>
      public credit: Credit
      public hasAlphaChannel: boolean

      constructor(options: { url: string; layers: string; parameters?: any; getFeatureInfoParameters?: any; enablePickFeatures?: boolean; getFeatureInfoFormats?: GetFeatureInfoFormat[]; rectangle?: Rectangle; tilingScheme?: TilingScheme; ellipsoid?: Ellipsoid; tileWidth?: number; tileHeight?: number; minimumLevel?: number; maximumLevel?: number; credit?: Credit | string; proxy?: any });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>
  }

  class WebMapTileServiceImageryProvider extends ImageryProvider {
      public clock: Clock
      public readonly credit: Credit
      public dimensions: any
      public readonly errorEvent: Event
      public readonly format: string
      public readonly hasAlphaChannel: boolean
      public readonly maximumLevel: number
      public readonly minimumLevel: number
      public readonly proxy: Proxy
      public readonly ready: boolean
      public readonly readyPromise: Promise<boolean>
      public readonly rectangle: Rectangle
      public readonly tileDiscardPolicy: TileDiscardPolicy
      public readonly tileHeight: number
      public readonly tileWidth: number
      public readonly tilingScheme: TilingScheme
      public times: TimeIntervalCollection
      public readonly url: string

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

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>

      public requestImage(x: number, y: number, level: number): Promise<HTMLImageElement | HTMLCanvasElement>
  }

  class Animation {
      public container: Element
      public viewModel: AnimationViewModel

      constructor(container: Element | string, viewModel: AnimationViewModel);

      public isDestroyed(): boolean

      public destroy(): void

      public resize(): void

      public applyThemeChanges(): void
  }

  class AnimationViewModel {
      public static defaultDateFormatter: AnimationViewModel.DateFormatter
      public static defaultTicks: number[]
      public static defaultTimeFormatter: AnimationViewModel.TimeFormatter
      public shuttleRingDragging: boolean
      public snapToTicks: boolean
      public timeLabel: string
      public dateLabel: string
      public multiplierLabel: string
      public shuttleRingAngle: number
      public slower: Command
      public faster: Command
      public clockViewModel: ClockViewModel
      public pauseViewModel: ToggleButtonViewModel
      public playReverseViewModel: ToggleButtonViewModel
      public playForwardViewModel: ToggleButtonViewModel
      public playRealtimeViewModel: ToggleButtonViewModel
      public dateFormatter: AnimationViewModel.DateFormatter
      public timeFormatter: AnimationViewModel.TimeFormatter

      constructor(clockViewModel: ClockViewModel);

      public getShuttleRingTicks(): number[]

      public setShuttleRingTicks(positiveTicks: number[]): void
  }

  namespace AnimationViewModel {
      type DateFormatter = (date: JulianDate, viewModel: AnimationViewModel) => string
      type TimeFormatter = (date: JulianDate, viewModel: AnimationViewModel) => string
  }

  class BaseLayerPicker {
      public container: Element
      public viewModel: BaseLayerPickerViewModel

      constructor(container: Element, options: { globe: Globe; imageryProviderViewModels?: ProviderViewModel[]; selectedImageryProviderViewModel?: ProviderViewModel; terrainProviderViewModels?: ProviderViewModel[]; selectedTerrainProviderViewModel?: ProviderViewModel });

      public isDestroyed(): boolean

      public destroy(): void
  }

  class BaseLayerPickerViewModel {
      public imageryProviderViewModels: ProviderViewModel[]
      public terrainProviderViewModels: ProviderViewModel[]
      public dropDownVisible: boolean
      public buttonTooltip: string
      public buttonImageUrl: string
      public selectedImagery: ProviderViewModel
      public selectedTerrain: ProviderViewModel
      public toggleDropDown: Command
      public globe: Globe

      constructor(options: { globe: Globe; imageryProviderViewModels?: ProviderViewModel[]; selectedImageryProviderViewModel?: ProviderViewModel; terrainProviderViewModels?: ProviderViewModel[]; selectedTerrainProviderViewModel?: ProviderViewModel });
  }

  class ProviderViewModel {
      public name: string
      public tooltip: string
      public iconUrl: string
      public creationCommand: Command

      constructor(options: {
          name: string;
          tooltip: string;
          iconUrl: string;
          creationFunction: ProviderViewModel.CreationFunction | Command
      });
  }

  namespace ProviderViewModel {
      type CreationFunction = () => ImageryProvider | TerrainProvider | ImageryProvider[] | TerrainProvider[]
  }

  class CesiumInspector {
      public container: Element
      public viewModel: CesiumInspectorViewModel

      constructor(container: Element | string, scene: Scene);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class CesiumInspectorViewModel {
      public frustums: boolean
      public performance: boolean
      public shaderCacheText: string
      public primitiveBoundingSphere: boolean
      public primitiveReferenceFrame: boolean
      public filterPrimitive: boolean
      public tileBoundingSphere: boolean
      public filterTile: boolean
      public wireframe: boolean
      public suspendUpdates: boolean
      public tileCoordinates: boolean
      public frustumStatisticText: string
      public tileText: string
      public hasPickedPrimitive: boolean
      public hasPickedTile: boolean
      public pickPimitiveActive: boolean
      public pickTileActive: boolean
      public dropDownVisible: boolean
      public generalVisible: boolean
      public primitivesVisible: boolean
      public terrainVisible: boolean
      public generalSwitchText: string
      public primitivesSwitchText: string
      public terrainSwitchText: string
      public scene: Scene
      public performanceContainer: Element
      public toggleDropDown: Command
      public showFrustums: Command
      public showPerformance: Command
      public showPrimitiveBoundingSphere: Command
      public showPrimitiveReferenceFrame: Command
      public doFilterPrimitive: Command
      public showWireframe: Command
      public doSuspendUpdates: Command
      public showTileCoordinates: Command
      public showTileBoundingSphere: Command
      public doFilterTile: Command
      public toggleGeneral: Command
      public togglePrimitives: Command
      public toggleTerrain: Command
      public pickPrimitive: Command
      public pickTile: Command
      public selectParent: Command
      public selectNW: Command
      public selectNE: Command
      public selectSW: Command
      public selectSE: Command
      public primitive: Command
      public tile: Command

      constructor(scene: Scene);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class CesiumWidget {
      public container: Element
      public canvas: HTMLCanvasElement
      public creditContainer: Element
      public scene: Scene
      public imageryLayers: ImageryLayerCollection
      public terrainProvider: TerrainProvider
      public camera: Camera
      public clock: Clock
      public screenSpaceEventHandler: ScreenSpaceEventHandler
      public targetFrameRate: number
      public useDefaultRenderLoop: boolean
      public resolutionScale: number

      constructor(container: Element | string, options?: CesiumWidgetOptions);

      public showErrorPanel(title: string, message: string, error?: string): void

      public isDestroyed(): boolean

      public destroy(): void

      public resize(): void

      public render(): void
  }

  class CesiumWidgetOptions {
      public clock?: Clock
      public imageryProvider?: ImageryProvider
      public terrainProvider?: TerrainProvider
      public skyBox?: SkyBox | boolean
      public skyAtmosphere?: SkyAtmosphere
      public sceneMode?: SceneMode
      public scene3DOnly?: boolean
      public orderIndependentTranslucency?: boolean
      public mapProjection?: MapProjection
      public globe?: Globe
      public useDefaultRenderLoop?: boolean
      public targetFrameRate?: number
      public showRenderLoopErrors?: boolean
      public contextOptions?: any
      public creditContainer?: Element | string
  }

  class ClockViewModel {
      public systemTime: JulianDate
      public startTime: JulianDate
      public stopTime: JulianDate
      public currentTime: JulianDate
      public multiplier: number
      public clockStep: ClockStep
      public clockRange: ClockRange
      public canAnimate: boolean
      public shouldAnimate: boolean
      public clock: Clock

      constructor(clock?: Clock);

      public synchronize(): void

      public isDestroyed(): boolean

      public destroy(): void
  }

  class Command {
      public canExecute: boolean
      public beforeExecute: Event
      public afterExecute: Event
  }

  class FullscreenButton {
      public container: Element
      public viewModel: FullscreenButtonViewModel

      constructor(container: Element | string, fullscreenElement?: Element | string);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class FullscreenButtonViewModel {
      public isFullscreen: boolean
      public isFullscreenEnabled: boolean
      public tooltip: string
      public fullscreenElement: Element
      public command: Command

      constructor(fullscreenElement?: Element | string);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class GeocoderOptions {
      public container?: Element | string
      public scene?: Scene
      public url?: string
      public key?: string
      public flightDuration?: number
  }

  class Geocoder {
      public container: Element
      public viewModel: GeocoderViewModel

      constructor(options: GeocoderOptions);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class GeocoderViewModel {
      public isSearchInProgress: boolean
      public searchText: string
      public flightDuration: number
      public url: string
      public key: string
      public complete: Event
      public scene: Scene
      public search: Command

      constructor(options: { scene: Scene; url?: string; key?: string; flightDuration?: number });
  }

  class GeocoderResult {
      public displayName: string
      public destination: Rectangle | Cartesian3
  }

  interface GeocoderService {
      geocode(query: string): Promise<GeocoderResult[]>
  }

  class HomeButton {
      public container: Element
      public viewModel: HomeButtonViewModel

      constructor(container: Element | string, scene: Scene, duration?: number);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class HomeButtonViewModel {
      public tooltip: string
      public scene: Scene
      public command: Command
      public duration: number

      constructor(scene: Scene, duration?: number);
  }

  class InfoBox {
      public container: Element
      public viewModel: InfoBoxViewModel
      public frame: HTMLIFrameElement

      constructor(container: Element | string);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class InfoBoxViewModel {
      public maxHeight: number
      public enableCamera: boolean
      public isCameraTracking: boolean
      public showInfo: boolean
      public titleText: string
      public description: string
      public cameraIconPath: string
      public cameraClicked: Event
      public closeClicked: Event

      public maxHeightOffset(offset: number): string
  }

  class NavigationHelpButton {
      public container: Element
      public viewModel: NavigationHelpButtonViewModel

      constructor(options: { container: Element | string; instructionsInitiallyVisible?: boolean });

      public isDestroyed(): boolean

      public destroy(): void
  }

  class NavigationHelpButtonViewModel {
      public showInstructions: boolean
      public tooltip: string
      public command: Command
      public showClick: Command
      public showTouch: Command
  }

  class PerformanceWatchdog {
      public container: Element
      public viewModel: PerformanceWatchdogViewModel

      constructor(options?: { container: Element | string; scene: Scene; lowFrameRateMessage?: string });

      public isDestroyed(): boolean

      public destroy(): void
  }

  class PerformanceWatchdogViewModel {
      public lowFrameRateMessage: string
      public lowFrameRateMessageDismissed: boolean
      public showingLowFrameRateMessage: boolean
      public scene: Scene
      public dismissMessage: Command

      constructor(options?: { scene: Scene; lowFrameRateMessage?: string });
  }

  class SceneModePicker {
      public container: Element
      public viewModel: SceneModePickerViewModel

      constructor(container: Element | string, scene: Scene, duration?: number);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class SceneModePickerViewModel {
      public sceneMode: SceneMode
      public dropDownVisible: boolean
      public tooltip2D: string
      public tooltip3D: string
      public tooltipColumbusView: string
      public selectedTooltip: string
      public scene: Scene
      public duration: number
      public toggleDropDown: Command
      public morphTo2D: Command
      public morphTo3D: Command
      public morphToColumbusView: Command

      constructor(scene: Scene, duration?: number);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class SelectionIndicator {
      public container: Element
      public viewModel: SelectionIndicatorViewModel

      constructor(container: Element | string, scene: Scene);

      public isDestroyed(): boolean

      public destroy(): void
  }

  class SelectionIndicatorViewModel {
      public position: Cartesian3
      public showSelection: boolean
      public isVisible: boolean
      public computeScreenSpacePosition: SelectionIndicatorViewModel.ComputeScreenSpacePosition
      public container: Element
      public selectionIndicatorElement: Element
      public scene: Scene

      constructor(scene: Scene, selectionIndicatorElement: Element, container: Element);

      public update(): void

      public animateAppear(): void

      public animateDepart(): void
  }

  namespace SelectionIndicatorViewModel {
      type ComputeScreenSpacePosition = (position: Cartesian3, result: Cartesian2) => Cartesian2
  }

  class Timeline {
      public container: Element

      constructor(container: Element, clock: Clock);

      public isDestroyed(): boolean

      public destroy(): void

      public zoomTo(startTime: JulianDate, stopTime: JulianDate): void

      public resize(): void
  }

  class ToggleButtonViewModel {
      public toggled: boolean
      public tooltip: string
      public command: Command

      constructor(command: Command, options?: { toggled?: boolean; tooltip?: string });
  }

  class ProjectionPicker {
      public container: Element
      public viewModel: ProjectionPickerViewModel

      constructor(container: Element | String, scene: Scene);

      public destroy(): void

      public isDestroyed(): boolean
  }

  class ProjectionPickerViewModel {
      public dropDownVisible: boolean
      public isOrthographicProjection: Command
      public scene: Scene
      public sceneMode: SceneMode
      public selectedTooltip: String
      public switchToOrthographic: Command
      public switchToPerspective: Command
      public toggleDropDown: Command
      public tooltipOrthographic: String
      public tooltipPerspective: String

      constructor(scene: Scene);

      public destroy(): void

      public isDestroyed(): boolean
  }

  class Viewer {
      public allowDataSourcesToSuspendAnimation: boolean
      public readonly animation: Animation
      public readonly baseLayerPicker: BaseLayerPicker
      public readonly bottomContainer: Element
      public readonly camera: Camera
      public readonly canvas: HTMLCanvasElement
      public readonly cesiumLogo: Element
      public readonly cesiumWidget: CesiumWidget
      public readonly clock: Clock
      public clockTrackedDataSource: DataSource
      public readonly clockViewModel: ClockViewModel
      public readonly container: Element
      public readonly dataSourceDisplay: DataSourceDisplay
      public readonly dataSources: DataSourceCollection
      public readonly entities: EntityCollection
      public readonly fullscreenButton: FullscreenButton
      public readonly geocoder: Geocoder
      public readonly homeButton: HomeButton
      public readonly imageryLayers: ImageryLayerCollection
      public readonly infoBox: InfoBox
      public readonly navigationHelpButton: NavigationHelpButton
      public readonly projectionPicker: ProjectionPicker
      public resolutionScale: number
      public readonly scene: Scene
      public readonly sceneModePicker: SceneModePicker
      public readonly screenSpaceEventHandler: ScreenSpaceEventHandler
      public selectedEntity: Entity
      public readonly selectedEntityChanged: Event
      public readonly selectionIndicator: SelectionIndicator
      public readonly shadowMap: ShadowMap
      public shadows: boolean
      public targetFrameRate: number
      public terrainProvider: TerrainProvider
      public terrainShadows: boolean
      public readonly timeline: Timeline
      public trackedEntity: Entity
      public readonly trackedEntityChanged: Event
      public useDefaultRenderLoop: boolean
      public readonly vrButton: VRButton

      constructor(container: Element | string, options?: ViewerOptions);

      public destroy(): void

      public extend(mixin: Viewer.ViewerMixin, options: any): void

      public flyTo(target: Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Promise<Entity | Entity[] | EntityCollection | DataSource | ImageryLayer>,
          options?: { duration?: number; maximumHeight?: number; offset?: HeadingPitchRange }): Promise<boolean>

      public forceResize(): void

      public isDestroyed(): boolean

      public render(): void

      public resize(): void

      public zoomTo(target: Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset | Promise<(Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset)>, offset?: HeadingPitchRange): Promise<boolean>
  }

  namespace Viewer {
      type ViewerMixin = (viewer: Viewer, options: any) => void
  }

  class ViewerOptions {
      public animation?: boolean
      public baseLayerPicker?: boolean
      public fullscreenButton?: boolean
      public vrButton?: boolean
      public geocoder?: boolean | GeocoderService[]
      public homeButton?: boolean
      public infoBox?: boolean
      public sceneModePicker?: boolean
      public selectionIndicator?: boolean
      public timeline?: boolean
      public navigationHelpButton?: boolean
      public navigationInstructionsInitiallyVisible?: boolean
      public scene3DOnly?: boolean
      public shouldAnimate?: boolean
      public clockViewModel?: ClockViewModel
      public selectedImageryProviderViewModel?: ProviderViewModel
      public imageryProviderViewModels?: ProviderViewModel[]
      public selectedTerrainProviderViewModel?: ProviderViewModel
      public terrainProviderViewModels?: ProviderViewModel[]
      public imageryProvider?: ImageryProvider | boolean
      public terrainProvider?: TerrainProvider | boolean
      public skyBox?: SkyBox | undefined
      public skyAtmosphere?: SkyAtmosphere | boolean
      public fullscreenElement?: Element | string
      public useDefaultRenderLoop?: boolean
      public targetFrameRate?: number
      public showRenderLoopErrors?: boolean
      public automaticallyTrackDataSourceClocks?: boolean
      public contextOptions?: any
      public sceneMode?: SceneMode
      public mapProjection?: MapProjection
      public globe?: Globe | boolean
      public orderIndependentTranslucency?: boolean
      public creditContainer?: Element | string
      public dataSources?: DataSourceCollection
      public terrainExaggeration?: number
      public shadows?: boolean
      public terrainShadows?: ShadowMode
      public mapMode2D?: MapMode2D
      public projectionPicker?: boolean
      public requestRenderMode?: boolean
      public maximumRenderTimeChange?: number
  }

  class VRButton {

      public readonly container: Element
      public readonly viewModel: VRButtonViewModel
      constructor(container: Element | string, scene: Scene, vrElement: Element | string);

      public destroy(): void

      public isDestroyed(): boolean
  }

  class VRButtonViewModel {

      public readonly command: Command
      public isVREnabled: boolean
      public readonly isVRMode: boolean
      public readonly tooltip: string
      public vrElement: Element
      constructor(scene: Scene, vrElement: Element | string);

      public destroy(): void

      public isDestroyed(): boolean
  }

  function barycentricCoordinates(point: Cartesian2 | Cartesian3, p0: Cartesian2 | Cartesian3, p1: Cartesian2 | Cartesian3, p2: Cartesian2 | Cartesian3, result?: Cartesian3): Cartesian3

  function binarySearch(array: any[], itemToFind: any, comparator: binarySearch.Comparator): number

  namespace binarySearch {
      type Comparator = (a: any, b: any) => number
  }

  function cancelAnimationFrame(requestID: number): void

  function clone(object: Object, deep?: boolean): Object

  function combine(object1?: Object, object2?: Object, deep?: boolean): Object

  function destroyObject(object: any, message?: string): void

  function formatError(object: any): string

  function getFilenameFromUri(uri: string): string

  function getImagePixels(image: HTMLImageElement): number[]

  function isArray(value: any): boolean

  function isLeapYear(year: number): boolean

  function jsonp(url: string, options?: { parameters?: any; callbackParameterName?: string; proxy?: any }): Promise<any>

  function loadArrayBuffer(url: string, headers?: any): Promise<ArrayBuffer>

  function loadBlob(url: string, headers?: any): Promise<Blob>

  function loadImage(url: string, allowCrossOrigin?: boolean): Promise<HTMLImageElement>

  function loadImageViaBlob(url: string): Promise<HTMLImageElement>

  function loadJson(url: string, headers?: any): Promise<any>

  function loadText(url: string, headers?: any): Promise<string>

  function loadWithXhr(options: {
      url: string;
      responseType?: string;
      method?: string;
      data?: string | FormData;
      headers?: any;
      overrideMimeType?: string;
  }): Promise<any>

  function loadXML(url: string, headers?: any): Promise<XMLDocument>

  function mergeSort(array: any[], comparator: mergeSort.Comparator, userDefinedObject?: any): void

  namespace mergeSort {
      type Comparator = (a: any, b: any, userDefinedObject?: any) => number
  }

  function objectToQuery(obj: any): string

  function pointInsideTriangle(point: Cartesian2 | Cartesian3, p0: Cartesian2 | Cartesian3, p1: Cartesian2 | Cartesian3, p2: Cartesian2 | Cartesian3): boolean

  function queryToObject(queryString: string): any

  function requestAnimationFrame(callback: requestAnimationFrame.Callback): number

  namespace requestAnimationFrame {
      type Callback = (timestamp: number) => void
  }

  function sampleTerrain(terrainProvider: TerrainProvider, level: number, positions: Cartographic[]): Promise<Cartographic[]>

  function subdivideArray<T>(array: T[], numberOfArrays: number): T[][]

  function throttleRequestByServer(url: string, requestFunction: throttleRequestByServer.RequestFunction): Promise<any>

  namespace throttleRequestByServer {
      type RequestFunction = (url: string) => Promise<any>
  }

  function createTangentSpaceDebugPrimitive(options: { geometry: Geometry; length?: number; modelMatrix?: Matrix4 }): Primitive

  function viewerCesiumInspectorMixin(viewer: Viewer): void

  function viewerDragDropMixin(viewer: Viewer, options?: { dropTarget?: Element | string; clearOnDrop?: boolean; proxy?: DefaultProxy }): void

  function viewerPerformanceWatchdogMixin(viewer: Viewer): void

  function createCommand(func: Function, canExecute?: boolean): Function

  function createTaskProcessorWorker(workerFunction: createTaskProcessorWorker.WorkerFunction): createTaskProcessorWorker.TaskProcessorWorkerFunction

  function createWorldTerrain(options?: { requestVertexNormals?: boolean, requestWaterMask?: boolean }): CesiumTerrainProvider

  namespace createTaskProcessorWorker {
      type WorkerFunction = (parameters: any, transferableObjects: any[]) => any
      type TaskProcessorWorkerFunction = (event: any) => void
  }

  class ClockRange {
      public static UNBOUNDED: number
      public static CLAMPED: number
      public static LOOP_STOP: number
  }

  class ClockStep {
      public static TICK_DEPENDENT: number
      public static SYSTEM_CLOCK_MULTIPLIER: number
      public static SYSTEM_CLOCK: number
  }

  class ComponentDatatype {
      public static BYTE: number
      public static UNSIGNED_BYTE: number
      public static SHORT: number
      public static UNSIGNED_SHORT: number
      public static FLOAT: number
      public static DOUBLE: number
      public static INT: number
      public static UNSIGNED_INT: number
  }

  namespace ComponentDatatype {
      function getSizeInBytes(componentDatatype: ComponentDatatype): number

      function fromTypedArray(array: Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Float64Array): ComponentDatatype

      function validate(componentDatatype: ComponentDatatype): boolean

      function createTypedArray(componentDatatype: ComponentDatatype, valuesOrLength: number | any[]): Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Float64Array

      function createArrayBufferView(componentDatatype: ComponentDatatype, buffer: ArrayBuffer, byteOffset?: number, length?: number): Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Float64Array
  }

  class CornerType {
      public static ROUNDED: number
      public static MITERED: number
      public static BEVELED: number
  }

  namespace CubicRealPolynomial {
      function computeDiscriminant(a: number, b: number, c: number, d: number): number

      function computeRealRoots(a: number, b: number, c: number, d: number): number[]
  }

  class ExtrapolationType {
      public static NONE: number
      public static HOLD: number
      public static EXTRAPOLATE: number
  }

  namespace FeatureDetection {
      function supportsFullscreen(): boolean

      function supportsTypedArrays(): boolean

      function supportsWebWorkers(): boolean
  }

  class Fullscreen {
      public static element: any
      public static changeEventName: string
      public static errorEventName: string
      public static enabled: boolean
      public static fullscreen: boolean
  }

  namespace Fullscreen {

      function supportsFullscreen(): boolean

      function requestFullscreen(element: any): boolean

      function exitFullscreen(): boolean
  }

  namespace GeometryPipeline {
      function toWireframe(geometry: Geometry): Geometry

      function createLineSegmentsForVectors(geometry: Geometry, attributeName?: string, length?: number): Geometry

      function createAttributeLocations(geometry: Geometry): any

      function reorderForPreVertexCache(geometry: Geometry): Geometry

      function reorderForPostVertexCache(geometry: Geometry, cacheCapacity?: number): Geometry

      function fitToUnsignedShortIndices(geometry: Geometry): Geometry[]

      function projectTo2D(geometry: Geometry, attributeName: string, attributeName3D: string, attributeName2D: string, projection?: any): Geometry

      function encodeAttribute(geometry: Geometry, attributeName: string, attributeHighName: string, attributeLowName: string): Geometry

      function transformToWorldCoordinates(instance: GeometryInstance): GeometryInstance

      function computeNormal(geometry: Geometry): Geometry

      function computeBinormalAndTangent(geometry: Geometry): Geometry

      function compressVertices(geometry: Geometry): Geometry
  }

  class HeightReference {
      public static CLAMP_TO_GROUND: number
      public static NONE: number
      public static RELATIVE_TO_GROUND: number
  }

  namespace HermitePolynomialApproximation {
      function getRequiredDataPoints(degree: number, inputOrder?: number): number

      function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[]

      function interpolate(x: number, xTable: number[], yTable: number[], yStride: number, inputOrder: number, outputOrder: number, result?: number[]): number[]
  }

  class IndexDatatype {
      public static UNSIGNED_BYTE: number
      public static UNSIGNED_SHORT: number
      public static UNSIGNED_INT: number
  }

  namespace IndexDatatype {
      function getSizeInBytes(indexDatatype: IndexDatatype): number

      function validate(indexDatatype: IndexDatatype): boolean

      function createTypedArray(numberOfVertices: number, indicesLengthOrArray: any): Uint16Array | Uint32Array

      function createTypedArrayFromArrayBuffer(numberOfVertices: number, sourceArray: ArrayBuffer, byteOffset: number, length: number): Uint16Array | Uint32Array
  }

  class InterpolationAlgorithm {
      public static type: string
  }

  namespace InterpolationAlgorithm {
      function getRequiredDataPoints(degree: number): number

      function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[]

      function interpolate(x: number, xTable: number[], yTable: number[], yStride: number, inputOrder: number, outputOrder: number, result?: number[]): number[]
  }

  class Intersect {
      public static OUTSIDE: number
      public static INTERSECTING: number
      public static INSIDE: number
  }

  namespace IntersectionTests {
      function rayPlane(ray: Ray, plane: Plane, result?: Cartesian3): Cartesian3

      function rayTriangle(ray: Ray, p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, cullBackFaces?: boolean, result?: Cartesian3): Cartesian3

      function lineSegmentTriangle(v0: Cartesian3, v1: Cartesian3, p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, cullBackFaces?: boolean, result?: Cartesian3): Cartesian3

      function raySphere(ray: Ray, sphere: BoundingSphere, result?: any): any

      function lineSegmentSphere(p0: Cartesian3, p1: Cartesian3, sphere: BoundingSphere, result?: any): any

      function rayEllipsoid(ray: Ray, ellipsoid: Ellipsoid): any

      function grazingAltitudeLocation(ray: Ray, ellipsoid: Ellipsoid): Cartesian3

      function lineSegmentPlane(endPoint0: Cartesian3, endPoint1: Cartesian3, plane: Plane, result?: Cartesian3): Cartesian3

      function trianglePlaneIntersection(p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, plane: Plane): any
  }

  namespace Intersections2D {
      function clipTriangleAtAxisAlignedThreshold(threshold: number, keepAbove: boolean, u0: number, u1: number, u2: number, result?: number[]): number[]

      function computeBarycentricCoordinates(x: number, y: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, result?: Cartesian3): Cartesian3
  }

  class Iso8601 {
      public static MINIMUM_VALUE: JulianDate
      public static MAXIMUM_VALUE: JulianDate
      public static MAXIMUM_INTERVAL: JulianDate
  }

  class KeyboardEventModifier {
      public static SHIFT: number
      public static CTRL: number
      public static ALT: number
  }

  namespace LagrangePolynomialApproximation {
      function getRequiredDataPoints(degree: number): number

      function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[]
  }

  namespace LinearApproximation {
      function getRequiredDataPoints(degree: number): number

      function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[]
  }

  class Math {
      public static EPSILON1: number
      public static EPSILON2: number
      public static EPSILON3: number
      public static EPSILON4: number
      public static EPSILON5: number
      public static EPSILON6: number
      public static EPSILON7: number
      public static EPSILON8: number
      public static EPSILON9: number
      public static EPSILON10: number
      public static EPSILON11: number
      public static EPSILON12: number
      public static EPSILON13: number
      public static EPSILON14: number
      public static EPSILON15: number
      public static EPSILON16: number
      public static EPSILON17: number
      public static EPSILON18: number
      public static EPSILON19: number
      public static EPSILON20: number
      public static GRAVITATIONALPARAMETER: number
      public static SOLAR_RADIUS: number
      public static LUNAR_RADIUS: number
      public static SIXTY_FOUR_KILOBYTES: number
      public static PI: number
      public static ONE_OVER_PI: number
      public static PI_OVER_TWO: number
      public static PI_OVER_THREE: number
      public static PI_OVER_FOUR: number
      public static PI_OVER_SIX: number
      public static THREE_PI_OVER_TWO: number
      public static TWO_PI: number
      public static ONE_OVER_TWO_PI: number
      public static RADIANS_PER_DEGREE: number
      public static DEGREES_PER_RADIAN: number
      public static RADIANS_PER_ARCSECOND: number
  }

  namespace Math {
      function sign(value: number): number

      function signNotZero(value: number): number

      function toSNorm(value: number, rangeMax?: number): number

      function fromSNorm(value: number): number

      function sinh(value: number): number

      function cosh(value: number): number

      function lerp(p: number, q: number, time: number): number

      function toRadians(degrees: number): number

      function toDegrees(radians: number): number

      function convertLongitudeRange(angle: number): number

      function negativePiToPi(angle: number): number

      function zeroToTwoPi(angle: number): number

      function mod(m: number, n: number): number

      function equalsEpsilon(left: number, right: number, relativeEpsilon: number, absoluteEpsilon?: number): boolean

      function factorial(n: number): number

      function incrementWrap(n: number, maximumValue: number, minimumValue?: number): number

      function isPowerOfTwo(n: number): boolean

      function logBase(number: number, base: number): number

      function nextPowerOfTwo(n: number): number

      function nextRandomNumber(): number

      function randomBetween(min: number, max: number): number

      function setRandomNumberSeed(seed: number): void

      function clamp(value: number, min: number, max: number): number

      function clampToLatitudeRange(angle: number): number

      function setRandomNumberSeed(seed: number): void

      function acosClamped(value: number): number

      function asinClamped(value: number): number

      function chordLength(angle: number, radius: number): number
  }

  class Packable {
      public static packedLength: number
  }

  namespace Packable {
      function pack(value: any, array: number[], startingIndex?: number): number[]

      function unpack(array: number[], startingIndex?: number, result?: any): any
  }

  class PackableForInterpolation {
      public static packedInterpolationLength: number
  }

  namespace PackableForInterpolation {
      function convertPackedArrayForInterpolation(packedArray: number[], startingIndex?: number, lastIndex?: number, result?: number[]): void

      function unpackInterpolationResult(array: number[], sourceArray: number[], startingIndex?: number, lastIndex?: number, result?: any): any
  }

  class PixelFormat {
      public static DEPTH_COMPONENT: number
      public static DEPTH_STENCIL: number
      public static ALPHA: number
      public static RGB: number
      public static RGBA: number
      public static RGB_DXT1: number
      public static RGB_ETC1: number
      public static RGB_PVRTC_2BPPV1: number
      public static RGB_PVRTC_4BPPV1: number
      public static RGBA_DXT1: number
      public static RGBA_DXT3: number
      public static RGBA_DXT5: number
      public static RGBA_PVRTC_2BPPV1: number
      public static RGBA_PVRTC_4BPPV1: number
      public static LUMINANCE: number
      public static LUMINANCE_ALPHA: number
  }

  class PrimitiveType {
      public static LINE_LOOP: number
      public static LINE_STRIP: number
      public static LINES: number
      public static POINTS: number
      public static TRIANGLE_FAN: number
      public static TRIANGLE_STRIP: number
      public static TRIANGLES: number
  }

  namespace QuadraticRealPolynomial {
      function computeDiscriminant(a: number, b: number, c: number): number

      function computeRealRoots(a: number, b: number, c: number): number[]
  }

  namespace QuarticRealPolynomial {
      function computeDiscriminant(a: number, b: number, c: number, d: number, e: number): number

      function computeRealRoots(a: number, b: number, c: number, d: number, e: number): number[]
  }

  class ReferenceFrame {
      public static FIXED: number
      public static INERTIAL: number
  }

  class ScreenSpaceEventType {
      public static LEFT_DOWN: number
      public static LEFT_UP: number
      public static LEFT_CLICK: number
      public static LEFT_DOUBLE_CLICK: number
      public static RIGHT_DOWN: number
      public static RIGHT_UP: number
      public static RIGHT_CLICK: number
      public static MIDDLE_DOWN: number
      public static MIDDLE_UP: number
      public static MIDDLE_CLICK: number
      public static MOUSE_MOVE: number
      public static WHEEL: number
      public static PINCH_START: number
      public static PINCH_END: number
      public static PINCH_MOVE: number
  }

  interface PositionedEvent {
      position: Cartesian2
  }

  interface MoveEvent {
      startPosition: Cartesian2
      endPosition: Cartesian2
  }

  interface Touch2Event {
      position1: Cartesian2
      position2: Cartesian2
  }


  namespace Simon1994PlanetaryPositions {
      function computeSunPositionInEarthInertialFrame(julianDate?: JulianDate, result?: Cartesian3): Cartesian3

      function computeMoonPositionInEarthInertialFrame(julianDate?: JulianDate, result?: Cartesian3): Cartesian3
  }

  class TimeStandard {
      public static UTC: number
      public static TAI: number
  }

  namespace Transforms {
      function eastNorthUpToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4

      function northEastDownToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4

      function northUpEastToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4

      function headingPitchRollToFixedFrame(origin: Cartesian3, heading: number, pitch: number, roll: number, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4

      function headingPitchRollQuaternion(origin: Cartesian3, heading: number, pitch: number, roll: number, ellipsoid?: Ellipsoid, result?: Quaternion): Quaternion

      function computeTemeToPseudoFixedMatrix(date: JulianDate, result?: Matrix3): Matrix3

      function preloadIcrfFixed(timeInterval: TimeInterval): Promise<void>

      function computeIcrfToFixedMatrix(date: JulianDate, result?: Matrix3): Matrix3

      function computeFixedToIcrfMatrix(date: JulianDate, result?: Matrix3): Matrix3

      function pointToWindowCoordinates(modelViewProjectionMatrix: Matrix4, viewportTransformation: Matrix4, point: Cartesian3, result?: Cartesian2): Cartesian2
  }

  namespace TridiagonalSystemSolver {
      function solve(diagonal: number[], lower: number[], upper: number[], right: Cartesian3[]): Cartesian3[]
  }

  class Visibility {
      public static NONE: number
      public static PARTIAL: number
      public static FULL: number
  }

  class WindingOrder {
      public static CLOCKWISE: number
      public static COUNTER_CLOCKWISE: number
  }

  class StripeOrientation {
      public static HORIZONTAL: number
      public static VERTICAL: number
  }

  class BingMapsStyle {
      public static AERIAL: string
      public static AERIAL_WITH_LABELS: string
      public static ROAD: string
      public static ORDNANCE_SURVEY: string
      public static COLLINS_BART: string
  }

  class BlendEquation {
      public static ADD: number
      public static MAX: number
      public static MIN: number
      public static SUBTRACT: number
      public static REVERSE_SUBTRACT: number
  }

  class BlendFunction {
      public static ZERO: number
      public static ONE: number
      public static SOURCE_COLOR: number
      public static ONE_MINUS_SOURCE_COLOR: number
      public static DESTINATION_COLOR: number
      public static ONE_MINUS_DESTINATION_COLOR: number
      public static SOURCE_ALPHA: number
      public static ONE_MINUS_SOURCE_ALPHA: number
      public static DESTINATION_ALPHA: number
      public static ONE_MINUS_DESTINATION_ALPHA: number
      public static CONSTANT_COLOR: number
      public static ONE_MINUS_CONSTANT_COLOR: number
      public static CONSTANT_ALPHA: number
      public static ONE_MINUS_CONSTANT_ALPHA: number
      public static SOURCE_ALPHA_SATURATE: number
  }

  class BlendingState {
      public static DISABLED: any
      public static ALPHA_BLEND: any
      public static PRE_MULTIPLIED_ALPHA_BLEND: any
      public static ADDITIVE_BLEND: any
  }

  class CameraEventType {
      public static LEFT_DRAG: number
      public static RIGHT_DRAG: number
      public static MIDDLE_DRAG: number
      public static WHEEL: number
      public static PINCH: number
  }

  class CullFace {
      public static FRONT: number
      public static BACK: number
      public static FRONT_AND_BACK: number
  }

  class DepthFunction {
      public static NEVER: number
      public static LESS: number
      public static EQUAL: number
      public static LESS_OR_EQUAL: number
      public static GREATER: number
      public static NOT_EQUAL: number
      public static GREATER_OR_EQUAL: number
      public static ALWAYS: number
  }

  class HorizontalOrigin {
      public static CENTER: number
      public static LEFT: number
      public static RIGHT: number
  }

  class LabelStyle {
      public static FILL: number
      public static OUTLINE: number
      public static FILL_AND_OUTLINE: number
  }

  class ModelAnimationLoop {
      public static NONE: number
      public static REPEAT: number
      public static MIRRORED_REPEAT: number
  }

  class SceneMode {
      public static MORPHING: number
      public static COLUMBUS_VIEW: number
      public static SCENE2D: number
      public static SCENE3D: number
  }

  namespace SceneMode {
      function getMorphTime(value: SceneMode): number
  }

  namespace SceneTransforms {
      function wgs84ToWindowCoordinates(scene: Scene, position: Cartesian3, result?: Cartesian2): Cartesian2

      function wgs84ToDrawingBufferCoordinates(scene: Scene, position: Cartesian3, result?: Cartesian2): Cartesian2
  }

  class StencilFunction {
      public static NEVER: number
      public static LESS: number
      public static EQUAL: number
      public static LESS_OR_EQUAL: number
      public static GREATER: number
      public static NOT_EQUAL: number
      public static GREATER_OR_EQUAL: number
      public static ALWAYS: number
  }

  class StencilOperation {
      public static ZERO: number
      public static KEEP: number
      public static REPLACE: number
      public static INCREMENT: number
      public static DECREMENT: number
      public static INVERT: number
      public static INCREMENT_WRAP: number
      public static DECREMENT_WRAP: number
  }

  class VerticalOrigin {
      public static CENTER: number
      public static BOTTOM: number
      public static TOP: number
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
  }): TileMapServiceImageryProvider

  class UrlTemplateImageryProvider extends ImageryProvider {
      public readonly url: string
      public readonly pickFeaturesUrl: string
      public readonly urlSchemeZeroPadding: {}
      public readonly proxy: Proxy
      public readonly credit: Credit
      public readonly minimumLevel: number
      public readonly maximumLevel: number
      public readonly rectangle: Rectangle
      public readonly tilingScheme: TilingScheme
      public readonly tileWidth: number
      public readonly tileHeight: number
      public readonly hasAlphaChannel: boolean
      public enablePickFeatures: boolean
      public readonly errorEvent: Event
      public readonly ready: boolean
      public readonly readyPromise: Promise<boolean>
      public readonly tileDiscardPolicy: TileDiscardPolicy

      constructor(options: {
          url: string,
          pickFeaturesUrl?: string,
          urlSchemeZeroPadding?: {},
          subdomains?: string | string[]
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
          getFeatureInfoFormats?: GetFeatureInfoFormat[],
          enablePickFeatures?: boolean,
          customTags?: any
      });

      public getTileCredits(x: number, y: number, level: number): Credit[]

      public pickFeatures(x: number, y: number, level: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[]>

      public reinitialize(options: Promise<Object> | Object): void
  }

  function defined(value: Object): boolean
}

declare module 'cesium/Cesium' {
  export = Cesium
}