export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
    );
  }
}


// /**
//  * a guard function copied from angular.io
//  * to protect a module from importing more than once
//  */
// export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
//   if (parentModule) {
//       throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`)
//   }
// }
