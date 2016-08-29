(ns lambdaui.example.simple-pipeline
    (:use [compojure.core])
    (:require [lambdacd.steps.shell :as shell]
      [lambdacd.steps.manualtrigger :refer [wait-for-manual-trigger]]
      [lambdacd.steps.control-flow :refer [either with-workspace in-parallel run]]
      [lambdacd.core :as lambdacd]
      [ring.server.standalone :as ring-server]
              [lambdacd.ui.api]
      [lambdacd.ui.ui-server :as ui]
      [lambdacd-git.core :as git]
      [lambdacd.runners :as runners]
      [clojure.java.io :as io]))

(def repo "git@github.com:flosell/testrepo")

(defn wait-for-git [args ctx]
      (git/wait-for-git ctx repo
                        :ref "refs/heads/master"
                        :ms-between-polls (* 60 1000)))

(defn clone [args ctx]
      (git/clone ctx repo (:revision args) (:cwd args)))

(defn ls [args ctx]
      (shell/bash ctx (:cwd args) "ls"))

(def pipeline-structure
  `((either
      wait-for-manual-trigger
      wait-for-git)
     (with-workspace
       clone
       git/list-changes

       ls)))

(defn -main [& args]
      (let [home-dir (io/file "/tmp/foo")
            config   {:home-dir home-dir}
            pipeline (lambdacd/assemble-pipeline pipeline-structure config)]
           (git/init-ssh!)
           (runners/start-one-run-after-another pipeline)
           (ring-server/serve (routes
                                (ui/ui-for pipeline))
                              {:open-browser? false
                               :port          8082})))