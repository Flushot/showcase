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
     * Hello world test
     */
    $app->get('/hello/{name}', function ($request, $response, $args) {
        return $response->getBody()->write("Hello {$args['name']}");
    });

    /**
     * Item data
     */
    $app->get('/items/', function ($request, $response, $args) {
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

});


/**
 * Catch-all
 */
$app->get('/{path:.+}', function ($request, $response, $args) {
    // TODO: sanitize $filePath so that it's not exploitable
    $filePath = 'public/' . $args['path'];
    if (file_exists($filePath)) {
        // Asset file
        $contents = @file_get_contents($filePath);
        return $response->getBody()->write($contents);
    } else {
        // Unknown route
        // TODO: return index.html and let client router handle things
        return $response->withStatus(404, "Asset not found: $filePath");
    }
});


// Run app
$app->run();
