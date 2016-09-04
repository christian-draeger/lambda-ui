(def secret (System/getenv "mysecret"))
(println "Lein: mysecret is " secret)
(defproject lambdaui "0.1.0-SNAPSHOT"
  :description "LambdaCD-Plugin that provides a modern UI for your pipeline."
  :url "https://github.com/sroidl/lambda-ui"
  :license {:name "Apache License 2.0"
            :url  "http://www.apache.org/licenses/LICENSE-2.0"}
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [lambdacd "0.9.0"]
                 [compojure "1.5.0"]
                 [http-kit "2.1.18"]
                 [org.clojure/data.json "0.2.6"]
                 ]

  :plugins [[lein-environ "0.4.0"]]
  :test-paths ["test"]
  :repositories [["clojars" {:username "sroidl"
                             :password [:gpg :env]}]
                 ["snapshots" :clojars]
                 ["releases" :clojars]
                 ]
  :profiles {:dev {:dependencies [[lambdacd-git "0.1.2"]
                                  [ring-server "0.4.0"]]

                   :aot          [lambdaui.core]
                   :main         lambdaui.core
                   }})
