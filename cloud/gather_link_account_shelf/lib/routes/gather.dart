import 'package:shelf/shelf.dart' show Response, Request;

Response gatherHandler(Request request) {
  var nonce = request.url.queryParameters['nonce'];
  var playerId = request.url.queryParameters['playerId'];

  return Response.ok('playerId: $playerId, nonce: $nonce');
}
