controllers.controller('gridCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Mascota', icon: 'hangout',link:'#/mascota' },
    { name: 'Facturacion', icon: 'mail',link:'#/facturacion' },
    { name: 'Servicios', icon: 'message',link:'#' },
    { name: 'Login', icon: 'copy2',link:'#' },
    { name: 'Proveedores', icon: 'facebook',link:'#/proveedor' },
    { name: 'Bodegas', icon: 'twitter',link:'#/bodega' },
    { name: 'Articulos', icon: 'twitter',link:'#/articulo' },
  ];
  $scope.listItemClick = function($index,link) {
    var clickedItem = $scope.items[$index];
    window.location.hash = link;
    $mdBottomSheet.hide(clickedItem);
  };
});