<?php

require 'vendor/autoload.php';

use Slim\App;
use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Exception\RequestException;


define('IMGUR_CLIENT_ID', '531d13764026e5f');

$app = new App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);


/**
 * Home page
 */
$app->get('/', function ($request, $response, $args) {
    return $response->withRedirect('index.html');
});


/**
 * API methods
 */
$app->group('/api', function () use ($app) {

    /**
     * Session
     */
    $app->group('/sessions', function () use ($app) {

        /**
         * Login
         */
        $app->post('/', function ($request, $response, $args) {
            $credentials = $request->getParsedBody();
            $body = $response->getBody();

            // TODO: authenticate user
            if ($credentials['username'] === 'chris' && $credentials['password'] === 'secret') {
                // Login succeeded
                // TODO: write session data
                $body->write(json_encode([
                    'id' => 'session_id_goes_here',
                    'user' => [
                        'id' => 1,
                        'first_name' => 'Chris',
                        'last_name' => 'Lyon'
                    ]
                ]));
                return $response->withStatus(201, 'Logged In');
            } else {
                // Login failed
                $body->write('Authentication failed');
                return $response->withStatus(400, 'Authentication Failed');
            }
        });

        /**
         * Logout
         */
        $app->delete('/current', function ($request, $response, $args) {
            return $response->withStatus(204, 'Logged Out');
        });

        /**
         * Get current session data
         */
        $app->get('/current', function ($request, $response, $args) {
            // TODO: get session state
            $response->getBody()->write(json_encode([
                'id' => 'session_id_goes_here',
                'user' => [
                    'id' => 1,
                    'first_name' => 'Chris',
                    'last_name' => 'Lyon'
                ]
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        });

        /**
         * Modify session data
         * (limited to certain variables)
         */
        $app->patch('/current', function ($request, $response, $args) {
            $sessionData = $request->getParsedBody();
            $allowedVars = ['impersonated_user_id'];

            // TODO: modify session state
            return $response->withStatus(501, 'Unimplemented');
        });

        /**
         * Get all active sessions (admin-only)
         */
        $app->get('/', function ($request, $response, $args) {
            return $response->withStatus(501, 'Unimplemented');
        });

        /**
         * Get specific session data (admin-only)
         */
        $app->get('/{sessionId}', function ($request, $response, $args) {
            $sessionId = $args['sessionId'];

            return $response->withStatus(501, 'Unimplemented');
        });

        /**
         * Force session to logout (admin-only)
         */
        $app->delete('/{sessionId}', function ($request, $response, $args) {
            $sessionId = $args['sessionId'];

            return $response->withStatus(501, 'Unimplemented');
        });

    });

    /**
     * Items
     */
    $app->group('/items', function () use ($app) {

        /**
         * Get item list
         */
        $app->get('/', function ($request, $response, $args) {
            $itemLimit = 60;
            $body = $response->getBody();

            $imgurClient = new HttpClient([
                'base_uri' => 'https://api.imgur.com',
                'timeout' => 10.0
            ]);

            try {
                $imgurResponse = $imgurClient->request('GET', '/3/gallery/hot/viral/0.json', [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Authorization' => 'Client-ID ' . IMGUR_CLIENT_ID
                    ]
                ]);
            } catch (RequestException $ex) {
                if ($ex->hasResponse()) {
                    $imgurResponse = $ex->getResponse();
                    $body->write('Imgur API error ' .
                        $imgurResponse->getStatusCode() . ': ' . $imgurResponse->getReasonPhrase());
                } else {
                    $body->write('Error communicating with Imgur API');
                }

                return $response
                    ->withStatus(500, 'API Error')
                    ->withHeader('Content-Type', 'text/plain');
            }

            $items = [];
            $imgurBody = json_decode($imgurResponse->getBody(), true);
            foreach ($imgurBody['data'] as $image) {
                if (!$image['is_album'] && isset($image['link'])) {
                    $items [] = [
                        'id' => $image['id'],
                        'title' => $image['title'],
                        'description' => $image['description'],
                        'url' => $image['link'],
                        'full_url' => $image['link']
                    ];
                }
            }

            if ($itemLimit !== null) {
                $items = array_slice($items, 0, $itemLimit);
            }

            $body->write(json_encode($items,
                JSON_PRETTY_PRINT | JSON_PARTIAL_OUTPUT_ON_ERROR));
            return $response->withHeader('Content-Type', 'application/json');
        });

        /**
         * Get item
         */
        $app->get('/{itemId}', function ($request, $response, $args) {
            $itemId = $args['itemId'];

            $response->getBody()->write(json_encode([
                'id' => $itemId,
                'un' => 'implemented'
            ]));

            return $response
                ->withStatus(501, 'Unimplemented')
                ->withHeader('Content-Type', 'application/json');
        });

        /**
         * Add item
         */
        $app->post('/', function ($request, $response, $args) {
            $itemData = $request->getParsedBody();

            // TODO: add item
            // TODO: return json encoded item and http status 201

            return $response->withStatus(501, 'Unimplemented');
        });

        /**
         * Update item
         */
        $app->patch('/{itemId}', function ($request, $response, $args) {
            $itemId = $args['itemId'];
            $itemData = $request->getParsedBody();

            // TODO: update item
            // TODO: return json encoded item

            return $response->withStatus(501, 'Unimplemented');
        });

        /**
         * Delete item
         */
        $app->delete('/{itemId}', function ($request, $response, $args) {
            $itemId = $args['itemId'];

            // TODO: delete item
            // TODO: return empty body and http status 202

            return $response->withStatus(501, 'Unimplemented');
        });

    });

});


/**
 * Catch-all
 */
$app->get('/{path:.+}', function ($request, $response, $args) {
    $body = $response->getBody();

    // Resolve file path
    $publicPath = realpath(dirname(__FILE__) . '/public');
    $rawPath = $publicPath . '/' . $args['path'];
    $filePath = realpath($rawPath);

    if ($filePath !== false && substr($filePath, 0, strlen($publicPath)) !== $publicPath) {
        // Someone was probably trying to exploit the file path
        error_log("Invalid path: $rawPath");
        $body->write('Go away.');
        return $response->withStatus(403, 'Forbidden');
    } elseif ($filePath !== false) {
        // Asset file
        $response->withHeader('Content-Type', mime_content_type($filePath));
        if (is_callable('apache_get_modules') && in_array('mod_xsendfile', apache_get_modules())) {
            // Apache + mod_xsendfile (zero copy send)
            return $response->withHeader('X-Sendfile', $filePath);
        } else {
            // Generic send
            $contents = @file_get_contents($filePath);
            $body->write($contents);
            return $response->withHeader('Content-Length', filesize($filePath));
        }
    } else {
        // Unknown route
        // TODO: return index.html and let client router handle things
        // TODO: check server-side render for a 404
        $body->write("Asset not found");
        return $response->withStatus(404, 'Not Found');
    }
});


// Run app
$app->run();
